/**
 * How use?
 * see `@/pages/cart.jsx`
 */

import { useReducer } from 'react'

const initialState = {
  list: [],
  cart: [],
  detail: {}
}

export const actionTypes = {
  SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
  SET_PRODUCT_DETAIL: 'SET_PRODUCT_DETAIL',
  SET_PRODUCT_CART: 'SET_PRODUCT_CART'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_PRODUCT_LIST: {
      return { ...state, list: action.payload }
    }
    case actionTypes.SET_PRODUCT_DETAIL: {
      return { ...state, detail: action.payload }
    }
    case actionTypes.SET_PRODUCT_CART: {
      return { ...state, cart: action.payload }
    }
    default:
      return state
  }
}

export const useProductStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    dispatch
  }
}

// actions
const setProductList = (data) => ({
  type: actionTypes.SET_PRODUCT_LIST,
  payload: data
})

const setProductDetail = (data) => ({
  type: actionTypes.SET_PRODUCT_DETAIL,
  payload: data
})

const setProductCart = (data) => ({
  type: actionTypes.SET_PRODUCT_CART,
  payload: data
})

export const ProductActions = {
  setProductList,
  setProductDetail,
  setProductCart
}
