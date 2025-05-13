import { configureStore } from '@reduxjs/toolkit'
import counterReducer from  '../features/counter/CounterSlice'
import usersSlice  from '../features/todo/UserSlice'
export const store = configureStore({
  reducer: {
  counter : counterReducer,
  users: usersSlice,
  },
})