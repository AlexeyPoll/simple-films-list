import * as actionTypes from '../actions/types';
import filterDuplicates from '../helpers/filterDuplicates';
import isEmptyObject from '../helpers/isEmptyObject';

const defaultAccounts = [
    {
        id: '50fdb4ec-93ec-45f5-81b3-5320a95a5d92',
        username: 'Alex',
        password: '123',
        favorite: [],
      },
      {
        id: '190eb0fd-9b59-48cb-8e60-d6bbaf177f79',
        username: 'Tin',
        password: '123',
        favorite: [],
      },
      {
        id: '200cea4c-cf48-4861-add3-4e75ff0a26ad',
        username: 'Nguyen',
        password: '123',
        favorite: [],
      }
];

const storedAccounts = localStorage.getItem('registratedAccounts');
const storedCurrentAccount = localStorage.getItem('currentAccount');

const initialState = {
    registratedAccounts: isEmptyObject(storedAccounts) ? defaultAccounts : JSON.parse(storedAccounts),
    currentAccount: isEmptyObject(storedCurrentAccount) ? {} : JSON.parse(storedCurrentAccount)
}

function users(store = initialState, action) {
    switch(action.type) {
        case actionTypes.CREATE_NEW_ACCOUNT:
            return {
                ...store,
                registratedAccounts: [
                    ...store.registratedAccounts,
                    action.payload
                ]
            }
        case actionTypes.SET_CURRENT_ACCOUNT:
            return {
                ...store,
                currentAccount: action.payload
            }
        case actionTypes.REMOVE_CURRENT_ACCOUNT:
            const filteredRegistratedAccounts = store.registratedAccounts.filter(account => account.id !== store.currentAccount.id);

            return {
                ...store,
                registratedAccounts: [ ...filteredRegistratedAccounts, store.currentAccount ],
                currentAccount: {}
            }
        case actionTypes.ADD_FAVORITE_FILM: 
            return {
                ...store,
                currentAccount: {
                    ...store.currentAccount,
                    favorite: filterDuplicates([...store.currentAccount.favorite, action.payload])
                }
            }
        case actionTypes.REMOVE_FAVORITE_FILM_BY_ID: 
            return {
                ...store,
                currentAccount: {
                    ...store.currentAccount,
                    favorite: store.currentAccount.favorite.filter(item => item !== action.payload)
                }
            }
        default:
            return store;
    }
}

export default users;