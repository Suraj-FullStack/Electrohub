import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './services/productApi'
import { categoryApi } from './services/categoryApi'
import { addApi } from './services/addApi'
import { deleteApi } from './services/deleteApi'
import { authApi } from './services/authApi'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [addApi.reducerPath]: addApi.reducer,
    [deleteApi.reducerPath]: deleteApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(addApi.middleware)
      .concat(deleteApi.middleware)
      .concat(authApi.middleware)
})

setupListeners(store.dispatch)