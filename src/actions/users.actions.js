import * as actionTypes from './types';

export function createNewAccount(userData) {
    return { type: actionTypes.CREATE_NEW_ACCOUNT, payload: userData };
}

export function setCurrentAccount(userData) {
    return { type: actionTypes.SET_CURRENT_ACCOUNT, payload: userData };
}

export function removeCurrentAccount() {
    return { type: actionTypes.REMOVE_CURRENT_ACCOUNT };
}

export function addFavoriteFilm(id) {
    return { type: actionTypes.ADD_FAVORITE_FILM, payload: id };
}

export function removeFavoriteFilmById(id) {
    return { type: actionTypes.REMOVE_FAVORITE_FILM_BY_ID, payload: id };
}