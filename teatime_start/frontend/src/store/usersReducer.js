import { csrfFetch } from "./csrf";

const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export const removeUser = userId => {
    return {
        type: REMOVE_USER,
        userId
    }
} 

export const loginUser = user => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify(user)
    })
    let data = await res.json();

    dispatch(receiveUser(data.user))
}

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: "DELETE"
    })

    sessionStorage.setItem('currentUser', null)

    dispatch(removeUser(userId))
}

export const createUser = user => async dispatch => {
    let res = await csrfFetch('/api/user', {
        method: "POST",
        body: JSON.stringify(user)
    })

    let data = await res.json();

    sessionStorage.setItem('currentUser', JSON.stringify(data.user))

    dispatch(receiveUser(data.user))
}

const usersReducer = (state = {}, action) => {
    const nextState = {...state}

    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload
            return nextState
        case REMOVE_USER:
            delete nextState[action.userId]
            return nextState
        default:
            return state
    }
}

export default usersReducer;

