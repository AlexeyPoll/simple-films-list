import * as actionTypes from '../actions/types';

const initialState = {
    items: [],
    filter: ''
};

function films(store = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_FILMS:
            return {
                ...store,
                items: [ 
                    ...store.items, 
                    ...action.payload 
                ]
            }
        case actionTypes.SET_FILTER_VALUE: 
            return {
                ...store,
                filter: action.payload 
            }
        default:
            return store;
    }
}

export default films;