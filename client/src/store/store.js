import { configureStore } from '@reduxjs/toolkit'
import { imageLoadApi } from './imageLoad'

export const store = configureStore({
  reducer: {
    [imageLoadApi.reducerPath]: imageLoadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(imageLoadApi.middleware),
})
