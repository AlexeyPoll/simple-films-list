import * as actionTypes from './types';
import { fetchAPIFilms } from '../api';

export function getFilms() {
    return function(dispatch) {
        fetchAPIFilms()
            .then(response => dispatch({ type: actionTypes.SET_FILMS, payload: response }))
            .catch(error => console.error(error))
    }
}

export function setFilterValue(value) {
    return { type: actionTypes.SET_FILTER_VALUE, payload: value };
}

export function addFavoriteFilm(id) {
    return { type: actionTypes.ADD_FAVORITE_FILM, payload: id };
}

export function removeFavoriteFilmById(id) {
    return { type: actionTypes.REMOVE_FAVORITE_FILM_BY_ID, payload: id };
}