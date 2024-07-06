// src/components/Judge.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Cards';

const Police = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100">
            <Card
                imageSrc="https://via.placeholder.com/300"
                title="Retrieve"
                description="This is the description for card 1."
                buttonText="Click Me 1"
                onButtonClick={() => handleButtonClick('/Retrieve')}
            />
            <Card
                imageSrc="https://via.placeholder.com/300"
                title="Upload"
                description="This is the description for card 2."
                buttonText="Click Me 2"
                onButtonClick={() => handleButtonClick('/Upload')}
            />

        </div>
    );
};

export default Police;
