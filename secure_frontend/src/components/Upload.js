import React, { useState } from "react";

function Upload() {
    const [evidenceId, setEvidenceId] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleEvidenceIdChange = (event) => {
        setEvidenceId(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmission = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const formData = new FormData();
            formData.append("file", file);

            const metadata = JSON.stringify({
                name: "File name",
            });
            formData.append("pinataMetadata", metadata);

            const options = JSON.stringify({
                cidVersion: 0,
            });
            formData.append("pinataOptions", options);

            const jwtToken = process.env.REACT_APP_PINATA_JWT;
            console.log("JWT Token:", jwtToken);

            setUploading(true); // Set uploading state to true during upload

            const response = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to upload file: ${response.statusText}`);
            }

            const responseData = await response.json();
            setIpfsHash(responseData.IpfsHash); // Assuming responseData structure

            console.log("File uploaded successfully. IPFS Hash:", responseData.IpfsHash);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false); // Reset uploading state after upload completes
        }
    };

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmission}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="evidenceId">
                    Evidence ID
                </label>
                <input
                    type="text"
                    id="evidenceId"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={evidenceId}
                    onChange={handleEvidenceIdChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    Upload File
                </label>
                <input
                    type="file"
                    id="file"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload Evidence'}
                </button>
            </div>
            {ipfsHash && (
                <div className="mt-4 text-green-500">
                    File uploaded successfully! IPFS Hash: {ipfsHash}
                </div>
            )}
        </form>
    );
}

export default Upload;
