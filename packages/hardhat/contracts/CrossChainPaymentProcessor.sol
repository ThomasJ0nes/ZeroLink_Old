//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import { IRouterClient } from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { Client } from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import { IERC20 } from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";

contract CrossChainPaymentProcessor is OwnerIsCreator {
	using SafeERC20 for IERC20;

	struct SubscriptionLite {
		address user; // The address of the subscriber
		address serviceProvider; // The address of the service provider
		uint256 amount; // Subscription amount to be paid
	}

	uint64 public constant SEPOLIA_CHAIN_SELECTOR = 16015286601757825753;
	address public constant USDC_TOKEN =
		0x5fd84259d66Cd46123540766Be93DFE6D43130D7;

	IRouterClient public s_router;
	IERC20 public s_linkToken;

	// Event emitted when the tokens are transferred to an account on another chain.
	event TokensTransferred(
		bytes32 indexed messageId,
		uint64 indexed destinationChainSelector,
		address receiver,
		address token,
		uint256 tokenAmount,
		address feeToken,
		uint256 fees
	);

	// Custom errors to provide more descriptive revert messages.
	error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);
	error NothingToWithdraw();
	error FailedToWithdrawEth(address owner, address target, uint256 value);
	error DestinationChainNotAllowlisted(uint64 destinationChainSelector);
	error InvalidReceiverAddress();

	modifier validateReceiver(address _receiver) {
		if (_receiver == address(0)) revert InvalidReceiverAddress();
		_;
	}

	/// @notice Constructor initializes the contract with the router address.
	/// @param _router The address of the router contract.
	/// @param _link The address of the link contract.
	constructor(address _router, address _link) {
		s_router = IRouterClient(_router);
		s_linkToken = IERC20(_link);
	}

	receive() external payable {}

	function makePaymentByLINK(
		SubscriptionLite calldata subscriptionLite
	)
		external
		onlyOwner
		validateReceiver(subscriptionLite.serviceProvider)
		returns (bytes32 messageId)
	{
		// Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
		//  address(linkToken) means fees are paid in LINK
		Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
			subscriptionLite.serviceProvider,
			USDC_TOKEN,
			subscriptionLite.amount,
			address(s_linkToken)
		);

		// Get the fee required to send the message
		uint256 fees = s_router.getFee(SEPOLIA_CHAIN_SELECTOR, evm2AnyMessage);

		if (fees > s_linkToken.balanceOf((address(this))))
			revert NotEnoughBalance(
				s_linkToken.balanceOf((address(this))),
				fees
			);

		// approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
		s_linkToken.approve(address(s_router), fees);

		// approve the Router to spend tokens on contract's behalf. It will spend the amount of the given token
		IERC20(USDC_TOKEN).approve(address(s_router), subscriptionLite.amount);

		// Send the message through the router and store the returned message ID
		messageId = s_router.ccipSend(SEPOLIA_CHAIN_SELECTOR, evm2AnyMessage);

		// Emit an event with message details
		emit TokensTransferred(
			messageId,
			SEPOLIA_CHAIN_SELECTOR,
			subscriptionLite.serviceProvider,
			USDC_TOKEN,
			subscriptionLite.amount,
			address(s_linkToken),
			fees
		);

		// Return the message ID
		return messageId;
	}

	function transferTokensPayNative(
		SubscriptionLite calldata subscriptionLite
	)
		external
		onlyOwner
		validateReceiver(subscriptionLite.serviceProvider)
		returns (bytes32 messageId)
	{
		// Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
		// address(0) means fees are paid in native gas
		Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
			subscriptionLite.serviceProvider,
			USDC_TOKEN,
			subscriptionLite.amount,
			address(0)
		);

		// Get the fee required to send the message
		uint256 fees = s_router.getFee(SEPOLIA_CHAIN_SELECTOR, evm2AnyMessage);

		if (fees > address(this).balance)
			revert NotEnoughBalance(address(this).balance, fees);

		// approve the Router to spend tokens on contract's behalf. It will spend the amount of the given token
		IERC20(USDC_TOKEN).approve(address(s_router), subscriptionLite.amount);

		// Send the message through the router and store the returned message ID
		messageId = s_router.ccipSend{ value: fees }(
			SEPOLIA_CHAIN_SELECTOR,
			evm2AnyMessage
		);

		// Emit an event with message details
		emit TokensTransferred(
			messageId,
			SEPOLIA_CHAIN_SELECTOR,
			subscriptionLite.serviceProvider,
			USDC_TOKEN,
			subscriptionLite.amount,
			address(0),
			fees
		);

		// Return the message ID
		return messageId;
	}

	function withdraw(address _beneficiary) public onlyOwner {
		// Retrieve the balance of this contract
		uint256 amount = address(this).balance;

		// Revert if there is nothing to withdraw
		if (amount == 0) revert NothingToWithdraw();

		// Attempt to send the funds, capturing the success status and discarding any return data
		(bool sent, ) = _beneficiary.call{ value: amount }("");

		// Revert if the send failed, with information about the attempted transfer
		if (!sent) revert FailedToWithdrawEth(msg.sender, _beneficiary, amount);
	}

	function withdrawUSDC(address _beneficiary) public onlyOwner {
		// Retrieve the balance of this contract
		uint256 amount = IERC20(USDC_TOKEN).balanceOf(address(this));

		// Revert if there is nothing to withdraw
		if (amount == 0) revert NothingToWithdraw();

		IERC20(USDC_TOKEN).safeTransfer(_beneficiary, amount);
	}

	/// @notice Construct a CCIP message.
	/// @dev This function will create an EVM2AnyMessage struct with all the necessary information for tokens transfer.
	/// @param _receiver The address of the receiver.
	/// @param _token The token to be transferred.
	/// @param _amount The amount of the token to be transferred.
	/// @param _feeTokenAddress The address of the token used for fees. Set address(0) for native gas.
	/// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
	function _buildCCIPMessage(
		address _receiver,
		address _token,
		uint256 _amount,
		address _feeTokenAddress
	) private pure returns (Client.EVM2AnyMessage memory) {
		// Set the token amounts
		Client.EVMTokenAmount[]
			memory tokenAmounts = new Client.EVMTokenAmount[](1);
		tokenAmounts[0] = Client.EVMTokenAmount({
			token: _token,
			amount: _amount
		});

		// Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
		return
			Client.EVM2AnyMessage({
				receiver: abi.encode(_receiver), // ABI-encoded receiver address
				data: "", // No data
				tokenAmounts: tokenAmounts, // The amount and type of token being transferred
				extraArgs: Client._argsToBytes(
					// Additional arguments, setting gas limit to 0 as we are not sending any data
					Client.EVMExtraArgsV1({ gasLimit: 0 })
				),
				// Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
				feeToken: _feeTokenAddress
			});
	}
}
