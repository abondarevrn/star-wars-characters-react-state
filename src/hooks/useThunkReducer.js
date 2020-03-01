import { useReducer, useCallback } from 'react'

export const useThunkReducer = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Be sure to wrap the functions in a useCallback because how javascript works
    // at each render of the caller function of useThunkReducer this will be a new function
    // so the useEffect that listen to the dependency of the enhancedDispatch will blow
    // up EVERYTHING !!!

    const enhancedDispatch = useCallback(action => {
        console.log(action)
        if (typeof action === 'function') {
            console.log("is a function")
            action(dispatch)
        } else {
            console.log("is an action")
            dispatch(action)
        }
    }, [dispatch]);

    return [state, enhancedDispatch]
}