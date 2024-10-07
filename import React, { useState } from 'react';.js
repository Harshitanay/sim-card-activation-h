import React, { useState } from 'react';
import axios from 'axios';

const SimStatus = () => {
    const [simNumber, setSimNumber] = useState('');
    const [status, setStatus] = useState('');

    const checkStatus = async () => {
        try {
            const res = await axios.get(`/api/status/${simNumber}`);
            setStatus(res.data.activated ? 'Activated' : 'Not Activated');
        } catch (error) {
            setStatus('SIM card not found.');
        }
    };

    return (
        <div>
            <h2>Check SIM Activation Status</h2>
            <input
                type="text"
                placeholder="SIM Number"
                value={simNumber}
                onChange={(e) => setSimNumber(e.target.value)}
            />
            <button onClick={checkStatus}>Check Status</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default SimStatus;
