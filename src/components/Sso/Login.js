import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCurrentAccount } from "../../actions/users.actions";

import styles from './Sso.module.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const registratedAccounts = useSelector(store => store.users.registratedAccounts)

    const handleLoginButtonClick = () => {
        if (!username) {
            setMessage('Enter username!');
            return
        }

        if (!password) {
            setMessage('Enter password!');
            return
        }

        const account = registratedAccounts.find(account => account.username === username);

        if (!account) {
            setMessage('Account does not exist!');
            return;
        }

        if (account.password !== password) {
            setMessage('Username or password is not correct');
            return;
        }

        setUsername('');
        setPassword('');

        dispatch(setCurrentAccount(account));

        setMessage('You succesfully logged in!')

        setTimeout(() => {
            setMessage('');
            navigate('/')
        }, 1500);
    }

    const handleUsernameChange = (event) => {
        const username = event.target.value;
        message && setMessage(false);
        setUsername(username)
    }

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        message && setMessage(false);
        setPassword(password)
    }

    return <div className={styles.login}>
        Login:
        {message && <div>{message}</div>}
        <input 
            value={username}
            placeholder={'Username'} 
            className={styles.input} 
            onChange={handleUsernameChange}
        />
        <input 
            value={password}
            type="password"
            placeholder={'Password'} 
            className={styles.input}
            onChange={handlePasswordChange} 
        />
        <button onClick={handleLoginButtonClick}>Login</button>
        <hr />
        <Link to='/create-account'><button>Go to Create Account</button></Link>
        <Link to='/'><button>Go to Films</button></Link>
    </div>
}

export default Login;