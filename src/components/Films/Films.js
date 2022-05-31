import React, { useEffect } from 'react';
import { getFilms, setFilterValue } from '../../actions/film.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import styles from './Films.module.css'
import { useNavigate } from "react-router-dom";
import Film from '../Film/Film';
import Filter from '../Filter/Filter';
import { removeCurrentAccount } from '../../actions/users.actions';

const Films = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const films = useSelector(store => store.films.items || []);
    const filter = useSelector(store => store.films.filter || '');
    const currentAccount = useSelector(store => store.users.currentAccount || {});

    useEffect(() => {
        if (!films.length) {
            dispatch(getFilms());
        }
    }, []);

    const handleLogOutClick = () => {
        dispatch(removeCurrentAccount());
        navigate('/login');
    }

    const handleFavoritesClick = () => {
        dispatch(setFilterValue(''));
    }

    return <div className={styles['films-wrapper']}>
        {
            currentAccount.username
                ? `Hello, ${currentAccount.username}!`
                : 'Please login or create an account!'
        }

        {!currentAccount.username && <Link to='/login'>Login</Link>}
        {!currentAccount.username && <Link to='/create-account'>Create Account</Link>}
        {currentAccount.username && <button onClick={handleLogOutClick}>Log out</button>}
        {currentAccount.username && <Link onClick={handleFavoritesClick} to='/favorites'>Favorites</Link>}

        <Filter />

        {
            films.length
                ? films
                    .filter(({ name }) => {
                        const lower_case_name = name.toLowerCase();
                        const lower_case_filter = filter.toLowerCase();

                        return lower_case_name.includes(lower_case_filter)
                    })
                    .map(({ _id, name }) => {
                        return <Film key={_id} id={_id} name={name} />
                    })
                : <div className={styles['loading']}>Loading ...</div>
        }
    </div>
}

export default Films;