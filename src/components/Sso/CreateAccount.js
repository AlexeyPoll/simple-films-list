import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";

import { createNewAccount, setCurrentAccount } from "../../actions/users.actions";

import styles from './Sso.module.css';

const CreateAccount = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const registratedAccounts = useSelector(store => store.users.registratedAccounts)

    const handleCreateClick = () => {
        if (!username) {
            setMessage('Forgot enter username!');
            return;
        }

        if (!password) {
            setMessage('Forgot enter password!');
            return;
        }

        setUsername('');
        setPassword('');

        const isAccountExist = registratedAccounts.some(account => account.username === username);

        if (isAccountExist) {
            setMessage('Account already exists!');

            return;
        }

        const data = { 
            id: uuid(), 
            username, 
            password,
            favorite: []
        }

        dispatch(createNewAccount(data));
        dispatch(setCurrentAccount(data));

        setMessage('You succesfully created an account!')

        setTimeout(() => {
            setMessage('');
            navigate('/')
        }, 2000);
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

    return <div className={styles['create-account']}>
        Create Account:
        {message && <div>{message}</div>}
        <input
            value={username}
            placeholder={'Username'} 
            className={styles.input} 
            onChange={handleUsernameChange}
        />
        <input
            value={password}
            placeholder={'Password'} 
            className={styles.input} 
            onChange={handlePasswordChange}
        />
        <button onClick={handleCreateClick}>Create Account</button>
        <hr />
        <Link to='/login'><button>Go to Login</button></Link>
        <Link to='/'><button>Go to Films</button></Link>
    </div>
}

export default CreateAccount;