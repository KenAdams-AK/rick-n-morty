import { configureStore } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux/es/exports"
import { TypedUseSelectorHook } from "react-redux/es/types"
import charactersReducer from './slices/charactersSlice'

const store = configureStore({
  reducer: {
    characters: charactersReducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store