import React, { useState, useEffect } from 'react';

const Retrieve = () => {
    const [cid, setCid] = useState(null);
    const [evidenceId, setEvidenceId] = useState('');

    const handleInputChange = (event) => {
        setEvidenceId(event.target.value);
    };

    const handleRetrieve = () => {
        // Simulate retrieving CID using evidence ID
        const simulatedCid = 'QmfYcrSBewzZ6SUu64QezkFZoLcmYc2MdtXD1fQ2ahGHCi'; // This should be replaced with actual retrieval logic
        setCid(simulatedCid);
    };

    useEffect(() => {
        // Optionally, initialize cid or perform other setup actions here if needed
    }, []);

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="evidenceId">
                    Evidence ID
                </label>
                <input
                    type="text"
                    id="evidenceId"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={evidenceId}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleRetrieve}
                >
                    Retrieve Evidence
                </button>
            </div>
            {cid && (
                <div className="mt-4">
                    <img
                        src={`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${cid}`}
                        alt="ipfs image"
                        className="max-w-full h-auto"
                    />
                </div>
            )}
        </div>
    );
};

export default Retrieve;
