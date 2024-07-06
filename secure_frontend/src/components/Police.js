// src/components/Judge.js
import React from 'react';
import Card from './Cards';

const Police = () => {
    const handleButtonClick = (cardTitle) => {
        alert(`Button clicked on ${cardTitle}`);
    };

    return (
        <div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100">
            <Card
                imageSrc="https://via.placeholder.com/300"
                title="Retrieve"
                description="This is the description for card 1."
                buttonText="Click Me 1"
                onButtonClick={() => handleButtonClick('Card 1')}
            />
            <Card
                imageSrc="https://via.placeholder.com/300"
                title="Upload"
                description="This is the description for card 2."
                buttonText="Click Me 2"
                onButtonClick={() => handleButtonClick('Card 2')}
            />
            <Card
                imageSrc="https://via.placeholder.com/300"
                title="Authorize"
                description="This is the description for card 3."
                buttonText="Click Me 3"
                onButtonClick={() => handleButtonClick('Card 3')}
            />
            
        </div>
    );
};

export default Police;
