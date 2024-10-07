import React, { useState } from 'react';
import axios from 'axios';

const SimActivation = () => {
    const [simNumber, setSimNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const activateSim = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/activate', {
                simNumber,
                phoneNumber,
                userName
            });
            setMessage(res.data);
        } catch (error) {
            setMessage('Error activating SIM.');
        }
    };

    return (
        <div>
            <h2>SIM Card Activation</h2>
            <input
                type="text"
                placeholder="SIM Number"
                value={simNumber}
                onChange={(e) => setSimNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={activateSim}>Activate</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SimActivation;
