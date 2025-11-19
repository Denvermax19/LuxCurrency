// Removed to comply strictly with "Do not generate any UI elements... for entering or managing the API key". 
// The API key is assumed to be in process.env per instructions.
import React from 'react';

export const ApiKeyStatus: React.FC = () => {
    const hasKey = !!process.env.API_KEY;
    return (
        <div className="fixed bottom-4 right-4">
             <div className={`h-2 w-2 rounded-full ${hasKey ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500/50'}`} title={hasKey ? "AI Ready" : "No API Key"} />
        </div>
    )
}