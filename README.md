# <h1 align="center" style="font-weight: bold; margin-top: 20px; margin-bottom: 20px;">useReducer-Hook NextJS: Server-side Rendering vs Static Generation vs Client-side</h1>
  
<h3 align="center" style="font-weight: bold; margin-top: 20px; margin-bottom: 20px;">Guide setup useReducer-Hook with Next JS</h3>
  
<p align="center">
  <a href="https://github.com/tampm92/tp-useReducer-nextjs-ssr-vs-ssg-vs-client-side"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/tampm92/tp-useReducer-nextjs-ssr-vs-ssg-vs-client-side/build"></a>
  <a href="#last-commit"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tampm92/tp-useReducer-nextjs-ssr-vs-ssg-vs-client-side"></a>
  <a href="#node-current"><img alt="node-current" src="https://img.shields.io/node/v/next"></a>
  <a href="#license"><img alt="GitHub" src="https://img.shields.io/github/license/tampm92/tp-useReducer-nextjs-ssr-vs-ssg-vs-client-side"></a>
</p>
  
<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#support">Need Help?</a> •
  <a href="#about">About</a> •
  <a href="#license">License</a>
</p>
  
<br/>

## Introduction

1. How use `useReducer-Hook` with `SSR` - `SSG` - `Client-side` in **Next JS**.
2. Example project
  
<br/>
  
## Key Features

- **[Next JS](https://nextjs.org/docs/getting-started)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Setup Tailwind for NextJS](https://blog.tampm.com/posts/tp-next-js-setup)**
- **[TP blog](https://blog.tampm.com/posts/next-js-server-side-rendering-vs-static-generation-vs-client-side)**

<br/>
  
## Usage

```sh
# install libs
yarn
# run dev
yarn dev
# run prod
yarn build
yarn start
```

<br/>
  
## Getting Started

### **Structure**

```js
.
├── 📁 assets
│   ├── 📁 styles
│   │   ├── 📝 tailwind.css
│   │   └── 📝 globals.scss
│   └── 📁 images
├── 📁 components
│   ├── 📁 common
│   └── 📁 partials
├── 📁 layouts
│   ├── 📁 components
│   └── 📝 default.jsx
├── 📁 pages
│   ├── 📁 api
│   ├── 📁 products
│   ├── 📝 _app.jsx
│   ├── 📝 index.jsx
│   └── 📝 cart.jsx
├── 📁 public
├── 📁 shared
│   ├── 📁 contexts
│   │   └── 📝 GlobalContext.js
│   ├── 📁 services
│   │   └── 📝 ProductService.js
│   ├── 📝 config.js
│   └── 📝 fetcher.js
├── 📁 store
│   ├── 📝 GlobalStore.js
│   └── 📝 ProductStore.js
├── 📝 .env
├── 📝 .env.development
├── 📝 .env.production
├── 📝 jsconfig.js
├── 📝 next.config.js
├── 📝 postcss.config.js
├── 📝 tailwind.config.js
└── 📝 README.md
```

<br/>

### **Prerequisites**

- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/getting-started/install)

## Documentation

### **Prepare setting**

You can read this [blog](https://blog.tampm.com/posts/next-js-server-side-rendering-vs-static-generation-vs-client-side)

### **Setup useReducer-Hook**

This example help you setup 2 Store

- 1 for global (see `/store/GlobalStore.js`)

```jsx
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
```

- 1 for special page (see `/store/ProductStore.js`)

```jsx
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
```

### **How use**

#### For global

- Create `GlobalContext` use `GlobalStore`

```js
import React, { useContext, createContext } from 'react'

import { useGlobalStore } from '@/store/GlobalStore'

const GlobalContext = createContext()

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
  const {state, dispatch} = useGlobalStore()

  return (
    <GlobalContext.Provider value={{
      state, dispatch
    }}>{children}
    </GlobalContext.Provider>
  )
}
```

- Use `GlobalContext` in `/pages/_app.jsx`

```js
import { GlobalProvider } from '@/shared/contexts/GlobalContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
```

- Use `global states` in `pages/components` (below exmaple is about `loading state`)

```jsx
import React, { useEffect } from 'react'

import { useGlobalContext } from '@/shared/contexts/GlobalContext'
import { GlobalActions } from '@/store/GlobalStore'

const Example = ({}) => {
  const { state: { isLoading }, dispatch } = useGlobalContext()

  useEffect(async () => {
    dispatch(GlobalActions.setLoading(true))

    // ...
    // await fetching anything to render
    //...
    
    dispatch(GlobalActions.setLoading(false))
  }, [])

  return (
    <>
      {isLoading && (
        <>
          Loading...
        </>
      )}
      
      {!isLoading && (
        // render data fetched
      )}
    </>
  )
}

export default Example
```

#### For special

- Use `ProductStore`

```jsx
import React, { useEffect } from 'react'

import { useProductStore, ProductActions } from '@/store/ProductStore'

const Example = ({}) => {
  const { state: { products }, dispatch } = useProductStore()

  useEffect(async () => {
    // ...
    // await fetching anything to render
    //...
    
    dispatch(ProductActions.setProductCart(res))
  }, [])

  return (
    <>
      // render data products
    </>
  )
}

export default Example
```

### **Performance and testing**

Any of testing activities and reports goes here.

<br/>

## Support
  
### **Get Help**
  
**You have a question or problem wasn't solved?** No worries! Just open up a new issue in the `GitHub issue tracker`. Please provide all information to reproduce your problem. If you don't have a GitHub account, you can [contact](#contact) me directly.
  
<br/>
  
## About

### **Known Issues**
  
 - none (that are reported)

<br/>
  
### **Contact**
  
If you haven't done so already, please check out [Get Help](#get-help) for the fastest possible help on your issue. Alternatively you can get in touch with me by:

- Email: tampm920810@gmail.com
  
<br/>

## License

This project is proudly licensed under the [MIT license][git-license].

<!-- LINKS -->
<!-- in-line references: websites -->
[tampm.com]:https://tampm.com

<!-- in-line references to github -->

[git-profile]:https://github.com/tampm92
[git-readme]:README.md
[git-license]:LICENSE.md