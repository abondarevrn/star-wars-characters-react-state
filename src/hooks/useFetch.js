import { useState, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    loading: false,
    response: [],
    error: null
}

const FETCH_LOADING = 'FETCH_LOADING';
const FETCH_COMPLETED = 'FETCH_COMPLETED';
const FETCH_ERROR = 'FETCH_ERROR';

const fetchReducer = (state, action) => {
    if (action.type == FETCH_LOADING) {
        return {
            loading: true,
            response: null,
            error: null
        }
    }

    if (action.type == FETCH_COMPLETED) {
        return {
            loading: false,
            response: action.payload.response,
            error: null
        }
    }

    if (action.type == FETCH_ERROR) {
        return {
            loading: false,
            response: null,
            error: action.payload.error
        }
    }

    return state
}

export const useFetch = (url) => {

    const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE)

    const { loading, error, response } = state
    useEffect(() => {

        dispatch({ type: FETCH_LOADING })

        fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch({ type: FETCH_COMPLETED, payload: { response: json } })
            })
            .catch((error) => {
                dispatch({ type: FETCH_ERROR, payload: { error } })
            })
    }, [])

    return [loading, error, response]
}

export const useFetchAsync = (url) => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAsync = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setResponse(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true);
        setResponse([]);
        setError(null)

        fetchAsync()

    }, [])

    return [loading, error, response]
}