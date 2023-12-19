import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NdFjDHO3kvTfl2zZkWaXLIU17EsFDZY1WEf52fD0dtbQIkFzuz3EYDnfHYAhEfO5j2SI4D0XcUrtZGvJ78HydPi00qg7Ev918');

const MyCheckoutButton = () => {
  const handleCheckoutClick = async () => {
    const stripe = await stripePromise;
    
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Add your line items here
      ],
      mode: 'payment',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });

    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleCheckoutClick}>
      Open Checkout Popup
    </button>
  );
};

export default MyCheckoutButton;
