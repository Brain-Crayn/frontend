import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const IB = () => {

    const navigate = useNavigate();
    
    return (
        <>
            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>
            <h>
                IB
            </h>
        </>
    );
}