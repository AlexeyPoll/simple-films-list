import React from 'react';
import { useDispatch } from 'react-redux';

import { setFilterValue } from '../../actions/film.actions';
import styles from './Filter.module.css';

const Filter = () => {
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
        const value = event.target.value;

        dispatch(setFilterValue(value))
    }

    return <div className={styles['filter-wrapper']}>
        Filter: {' '}
        <input onChange={handleInputChange} />
    </div>
}

export default Filter;