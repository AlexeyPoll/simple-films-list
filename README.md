# Simple example project

## Redux flow:

1. Store - our redux global object.

    Directory [src/store](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/store/index.js) - basic redux store set up with thunk middlware.

    It will be passed to Provider as a store prop inside root component [src/index.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/index.js).

2. Reducers - just functions `function(store, action)` which return new     immutable (=new object) store which will override current store.
    
    You know that object in JavaScript is reference data type. So we have to create new object with new reference.

    There are two reducers: [src/reducers/films.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/films.js), [src/reducers/users.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/users.js).

    They are combined in [src/reducers/index.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/index.js) and imported to [src/store - line 3](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/store/index.js#L3).

3. Actions - just an object like this `{ type: ACTION_TYPE, payload: DATA }`

    First of all we need constants with action types [src/actions/types.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/actions/types.js). It will help to be sure about correct spelling.

    Actions directories: [src/actions/film.actions.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/actions/film.actions.js) and [src/actions/users.actions.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/actions/users.actions.js). In this files you will find functions which return objects in this format `{ type: ACTION_TYPE, payload: DATA }` so it means that this is a functions which return actions or `action creators`.

    Due to we added to [src/store/index.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/store/index.js) `thunk` middleware we can write `action creators` like this [thunk example](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/actions/film.actions.js#L4). It will call your API and after success or reject call appropriate [handler](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/actions/film.actions.js#L7). As you see in the `.then()` I call `dispatch()` with appropriate `action` which will call (=or dispatch) action `SET_FILMS` to [src/reducers/films.js - line 10](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/films.js#L10) and the `reducer` will return new immutable `store` and this `store` will replace my current store.

    ## Store sctucture

    1.The structure of the store will be determined here [src/store/index.js - line 11](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/store/index.js#L11) - store struture depends on you reducers. Root reduser has this structure [src/reducers/index.js - line 4](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/index.js#L4). Every reduser is a separate prop in the store and these props will contain structure depends on they initial state like her [users reducer initial state](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/users.js#L29) and [films reduces initial state](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/films.js#L3). So out redux store will look like this:

    ```javascript
    {
        films: {
            items: [],
            filter: ''
        },
        users: {
            registratedAccounts: [],
            currentAccount: {}
        }
    }
    ```

    ```
    items - Just film objects which we'll get after API request
    filter - We'll filter our films by this value
    registratedAccounts - Just list of all known users
    currentAccount - Current logged in user
    ```

## Components

1. Films

    Compnent which contains a list of all films which we've got from out API.

    Here I do API call to get films [Films.js - line 21](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Films/Films.js#L21). I do the call by dispatching appropriate action (=or a function wich returns action object).

    As soon as API give me fimls list I take from the store here [Films.js - line 15](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Films/Films.js#L15) and will use this value as an unsual array and render it here [Films.js - line 51](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Films/Films.js#L51).

2. Film - just a template for a film object with buttons `Add to favorite` and `Remove from favorite`. You can see here that I'm interacting only with our store here through `dispatch()` and appropriate `actions`.

3. Filter - a component just with an input which [dispatch(setFilterValue(value))](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Filter/Filter.js#L13) and write this value to the store. 

    Then I'll use this value here [Films.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Films/Films.js#L16) to filter the films.

4. Favorite - component this favorite filmes for the current user. 
    
    You can see that in this component [Favorite.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Favorites/Fvorites.js#L9) I take `current user`, `films` and `filter` and then I use these values to filter `films` array and render only films which `currenct user` has in his `favorites`.

5. Sso - Sign in Sign out. I won't share with you a lot of links here because I'm busy and already tired :)

    Here you find [Login.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/Login.js) and [Create Account](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/CreateAccount.js).

    I implemented a simple validation here.

    ### Create account

    1. When you create account you type `username` and `password`. First of all we check If user entered these data and then check if account with such username alredy exist. If something wrong we show a message with error.

    2. If everything OK we generate [user data object](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/CreateAccount.js#L41) and `dispatch()` this object to the store using appropriate actions.

    ### Login

    Almost the same thing.

    1. Check if user entered data.
    
    2. Check if account exist

    3. Check password

    4. Everything OK? So take this account from our redux `registratedAccounts` and `dispatch()` it as `current account` here [dispatch(setCurrentAccount(account));](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/Login.js#L43).


## Router

1. Router set up here [src/index.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/index.js#L32) and routes her [src/components/App.js](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/App.js).

2. To navigate between routes we use `<Link />` component like here [example Link](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Favorites/Fvorites.js#L28). It looks like `<a />` tag.

3. If you want make `<Link />` look like button you can do it like this [example Link as Button](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/Login.js#L83).

4. Above you can see components and sometimes you want to navigate after API call. So you can use [useNavigate](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/Login.js#L83) from `react-router-dom`. Usage here [example navigate](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/components/Sso/Login.js#L49).


# Last words


I created logic to store `logged in user` and `registrated users` in the `localStorage`. [This is example](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/index.js#L14-L28).

 And when I start my application I check if I have something in local storage. If no just set default values. [Here's an example](https://github.com/AlexeyPoll/simple-films-list/blob/master/src/reducers/users.js#L26-L32).


Thank you!

Best regards.

