import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
            if (response.status !== 200) {
                throw new Error('Invalid username or password');
            }
            const user = response.data// Assuming token is returned upon successful login
            onLogin(user);
        } catch (err) {
            setError(err.message || 'An error occurred while trying to log in');
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                {error && <div>{error}</div>}
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Text className="text-muted">
                    <p>Use default  credentials: Username- <strong>kminchelle</strong> and password- <strong>0lelplR</strong> for quick testing.</p>
                </Form.Text>
            </Form>
        </div>
    );
};

export default LoginForm;
