import React, { useEffect } from 'react';
import { getFilms, setFilterValue } from '../../actions/film.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import styles from './Favorites.module.css'
import Film from '../Film/Film';
import Filter from '../Filter/Filter';

const Favorites = () => {
    const dispatch = useDispatch();
    const films = useSelector(store => store.films.items || []);
    const filter = useSelector(store => store.films.filter || '');
    const currentAccount = useSelector(store => store.users.currentAccount || {});

    useEffect(() => {
        if (!films.length) {
            dispatch(getFilms());
        }
    }, []);

    const handleGoToFilmsClick = () => {
        dispatch(setFilterValue(''))
    }

    return <div className={styles['films-wrapper']}>
        {`${currentAccount.username}'s `} Favorite Films:

        <Link onClick={handleGoToFilmsClick} to='/'>Go to Films</Link>
        
        <Filter />

        {
            films.length
                ? films
                    .filter(({ _id }) => {
                        return currentAccount.favorite.includes(_id)
                    })
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

export default Favorites;