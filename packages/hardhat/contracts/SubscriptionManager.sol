//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Basic Frame of SubscriptionManager.sol contract NOT final version and will be greatly improved and altered
// PLEASE COMMMENT ON ALL CODE BLOCKS FOR EASY READABILITY

contract SubscriptionManager {
	struct Subscription {
		address user; // The address of the subscriber
		address serviceProvider; // The address of the service provider
		uint256 amount; // Subscription amount to be paid
		uint256 interval; // Payment interval in seconds
		string preferredBlockchain; // The blockchain preferred for payment
		uint256 nextPaymentDate; // The timestamp for the next payment
	}

	mapping(uint256 => Subscription) public subscriptions; // Mapping to store all subscriptions with a unique subscription ID

	mapping(address => uint256[]) public userSubscriptions; // Mapping to store subscription IDs associated with each user address

	// Counter to generate unique subscription IDs
	uint256 public subscriptionCounter;

	// Events to emit when a subscription is created or a payment is triggered
	event SubscriptionCreated(
		uint256 subscriptionId,
		address indexed user,
		address indexed serviceProvider,
		uint256 amount,
		uint256 interval,
		string preferredBlockchain
	);

	event PaymentTriggered(
		uint256 subscriptionId,
		uint256 amount,
		string blockchain
	);

	// Function to create a new subscription
	function createSubscription(
		address serviceProvider,
		uint256 amount,
		uint256 interval,
		string memory preferredBlockchain
	) public returns (uint256) {
		require(amount > 0, "Amount must be greater than 0");
		require(interval > 0, "Interval must be greater than 0");

		subscriptionCounter++; // Increment the subscription counter to get a unique ID
		uint256 subscriptionId = subscriptionCounter;

		// Store the new subscription in the mapping
		subscriptions[subscriptionId] = Subscription({
			user: msg.sender,
			serviceProvider: serviceProvider,
			amount: amount,
			interval: interval,
			preferredBlockchain: preferredBlockchain,
			nextPaymentDate: block.timestamp + interval
		});

		// Add the subscription ID to the user's list of subscriptions
		userSubscriptions[msg.sender].push(subscriptionId);

		// Emit an event for the creation of the subscription
		emit SubscriptionCreated(
			subscriptionId,
			msg.sender,
			serviceProvider,
			amount,
			interval,
			preferredBlockchain
		);

		return subscriptionId;
	}

	function triggerPayments(uint256 subscriptionId) public {
		Subscription storage subscription = subscriptions[subscriptionId];
		require(
			subscription.user == msg.sender,
			"Only the subscriber can trigger payments!"
		);
		require(
			subscription.nextPaymentDate <= block.timestamp,
			"Payment not due yet"
		);

		// Logic to initiate cross-chain payment or LayerZero message (to be implemented)
		// For example, calling a function in OmnichainSubscriptionManager or CrossChainPaymentProcessor

		// Update the next payment date for the subscription
		subscription.nextPaymentDate += subscription.interval;

		// Emit an event for the payment being triggered
		emit PaymentTriggered(
			subscriptionId,
			subscription.amount,
			subscription.preferredBlockchain
		);
	}

	function getUserSubscriptions(
		address user
	) public view returns (uint256[] memory) {
		return userSubscriptions[user];
	}

	// Function to update the preferred blockchain for a given subscription
	function updateSubscriptionPreferences(
		uint256 subscriptionId,
		string memory newPreferredBlockchain
	) public {
		Subscription storage subscription = subscriptions[subscriptionId];
		require(
			subscription.user == msg.sender,
			"Only the subscriber can update preferences"
		);

		subscription.preferredBlockchain = newPreferredBlockchain;

		// Additional logic to be added here to handle changes in preference if needed
	}

// --------  TO DO ------------------
  
  //   Improve and test
	  // Additional functions for managing subscriptions to be added: 
	  // Update Subscription details
	  // Pause Subscription 
	  // Get Next Payment Date
	  // Refund Subscription Payment ??

	 function cancelSubscription(uint256 subscriptionId) public {
        Subscription storage subscription = subscriptions[subscriptionId];
        require(subscription.user == msg.sender, "Only the subscriber can cancel the subscription");

        // Remove the subscription from the mapping and the user's list
        delete subscriptions[subscriptionId];
        // Find and remove the subscription ID from userSubscriptions
        uint256[] storage userSubs = userSubscriptions[msg.sender];
        for (uint256 i = 0; i < userSubs.length; i++) {
            if (userSubs[i] == subscriptionId) {
                userSubs[i] = userSubs[userSubs.length - 1];
                userSubs.pop();
                break;
         
		    }
        }
	 }
}
