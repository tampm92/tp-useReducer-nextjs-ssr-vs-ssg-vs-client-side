/**
 * How use?
 * 
 * 1. Create a context in parent component 
 * see `@/shared/contexts/GlobalContext` 
 * and `@/pages/_app.jsx`
 * 2. Use in child component
 * see `@/pages/cart.jsx`
 */

import { useReducer } from 'react'

const initialState = {
  isLoading: false
}

export const actionTypes = {
  SET_LOADING: 'SET_LOADING'
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const useGlobalStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    dispatch
  }
}

// actions
const setLoading = (data) => ({
  type: actionTypes.SET_LOADING,
  payload: data
})

export const GlobalActions = {
  setLoading
}
