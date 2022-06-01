import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteFilm, removeFavoriteFilmById } from '../../actions/users.actions';
import isEmptyObject from '../../helpers/isEmptyObject';

import styles from './Film.module.css'

const Film = ({ id, name }) => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.users.currentAccount);

    const handleAddFavoriteFilm = () => {
        dispatch(addFavoriteFilm(id))
    }

    const handleRemoveFavoriteFilmById = () => {
        dispatch(removeFavoriteFilmById(id))
    }

    const alreadyFavorite = isEmptyObject(currentAccount) || currentAccount.favorite.includes(id);

    return <div className={styles['film-wrapper']}>
        <div><b>Name:</b> {name}</div>
        <button 
            onClick={alreadyFavorite ? handleRemoveFavoriteFilmById : handleAddFavoriteFilm}
            disabled={isEmptyObject(currentAccount)}
        >
            {
                isEmptyObject(currentAccount) 
                    ? "Need to login to add favorite"
                    : currentAccount.favorite.includes(id) ? "Remove from favorite" : "Add to favorite" 
                    
            }
        </button>
    </div>
}

export default Film;