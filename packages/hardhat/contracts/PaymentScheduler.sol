// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PaymentScheduler {
    using SafeMath for uint256;

    struct Subscription {
        uint256 amount;
        uint256 interval;
        uint256 lastPaymentDate;
        bool active;
    }

    mapping(address => Subscription) public subscriptions;
    address[] public subscribers;

    IERC20 public usdcToken;

    event SubscriptionCreated(address indexed subscriber, uint256 amount, uint256 interval);
    event SubscriptionUpdated(address indexed subscriber, uint256 amount, uint256 interval);
    event SubscriptionCancelled(address indexed subscriber);
    event PaymentProcessed(address indexed subscriber, uint256 amount, uint256 date);

    constructor(address _usdcTokenAddress) {
        usdcToken = IERC20(_usdcTokenAddress);
    }

    function createSubscription(uint256 _amount, uint256 _interval) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(_interval > 0, "Interval must be greater than 0");
        require(!subscriptions[msg.sender].active, "Subscription already exists");

        subscriptions[msg.sender] = Subscription({
            amount: _amount,
            interval: _interval,
            lastPaymentDate: block.timestamp,
            active: true
        });

        subscribers.push(msg.sender);
        emit SubscriptionCreated(msg.sender, _amount, _interval);
    }

    function updateSubscription(uint256 _amount, uint256 _interval) external {
        require(subscriptions[msg.sender].active, "No active subscription");
        require(_amount > 0, "Amount must be greater than 0");
        require(_interval > 0, "Interval must be greater than 0");

        subscriptions[msg.sender].amount = _amount;
        subscriptions[msg.sender].interval = _interval;

        emit SubscriptionUpdated(msg.sender, _amount, _interval);
    }

    function cancelSubscription() external {
        require(subscriptions[msg.sender].active, "No active subscription");
        subscriptions[msg.sender].active = false;
        emit SubscriptionCancelled(msg.sender);
    }

    // iterates through all subscribers, checks if a payment is due, and calls the payment processor if necessary
    function processPayments() external {
        for (uint256 i = 0; i < subscribers.length; i++) {
            address subscriber = subscribers[i];
            Subscription storage sub = subscriptions[subscriber];

            if (sub.active && block.timestamp >= sub.lastPaymentDate.add(sub.interval)) {
                require(usdcToken.balanceOf(subscriber) >= sub.amount, "Insufficient USDC balance");
                require(usdcToken.allowance(subscriber, address(this)) >= sub.amount, "Insufficient allowance");

                usdcToken.transferFrom(subscriber, address(this), sub.amount);
                
                // --------  TO DO -------------
                // Call CrossChainPaymentProcessor


                sub.lastPaymentDate = block.timestamp;
                emit PaymentProcessed(subscriber, sub.amount, block.timestamp);
            }
        }
    }

    function setUSDCToken(address _usdcTokenAddress) external {
        usdcToken = IERC20(_usdcTokenAddress);
    }
}