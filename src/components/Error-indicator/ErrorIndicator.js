import React from 'react';
import './ErrorIndicator.css';
import boom from './boom.gif';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <div className="boom-img">
                <img src = {boom} alt = {`boom.gif`}></img>
            </div>
            <span className="boom">BOOM!</span>

            <span> Something has gone terribly wrong</span>

            <span> (but we alredy sent droids to fix it)</span>
        </div>
    );
};

export default ErrorIndicator;