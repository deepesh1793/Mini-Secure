import React, { useState } from 'react';

const Approve = ({ evidenceContract }) => {
  const [accountAddress, setAccountAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!evidenceContract) {
        throw new Error('Contract not initialized.');
      }
      await evidenceContract.addPoliceRole(accountAddress);
      setMessage('Police role added successfully.');
    } catch (error) {
      setMessage(`Failed to add police role: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Approve Police Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="accountAddress" className="block text-sm font-medium text-gray-700">Account Address</label>
          <input
            type="text"
            id="accountAddress"
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
        >
          Approve
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default Approve;
