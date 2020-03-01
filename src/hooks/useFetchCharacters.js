import { useEffect } from 'react'

import BASE_URL from '../endpoint'
import { useThunkReducer } from './useThunkReducer'
import { fetchReducer, INITIAL_STATE, FETCH_LOADING, FETCH_COMPLETED, FETCH_ERROR } from './useFetch';

const fetchCharacters = (dispatch) => {
    dispatch({ type: FETCH_LOADING })

    fetch(`${BASE_URL}/characters`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({ type: FETCH_ERROR, payload: { error: response.statusText } })
            }
        })
        .then(json => {
            if (json)
                dispatch({ type: FETCH_COMPLETED, payload: { response: json } })
        })
        .catch((error) => {
            dispatch({ type: FETCH_ERROR, payload: { error } })
        })
}

// Can be more abstract passing an url and a formatting function for the response
export const useFetchCharacters = () => {

    const [state, dispatch] = useThunkReducer(fetchReducer, INITIAL_STATE)
    const { loading, response: characters, error } = state;

    useEffect(() => {

        // THUNK IS FOR A BETTER VISUAL CODING OF WHAT IS ACTUALLY GOING ON
        // NOT CLEAR -----> fetchCharacters(dispatch)

        // MORE CLARITY and additionally if you want to pass parameters is even more clear
        // than doing -------> fetchCharacters(dispatch, objectOfParams)
        // EVEN MORE we are actually extending the functionality of dispatch instead of passing the basic functionality around

        dispatch(fetchCharacters)

    }, [dispatch])

    return [loading, characters, error]
}