import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice';
import usersSlice from '../features/todo/UserSlice';
import gitUser from '../features/gitSlice/gitSlicer';
import userData from '../features/crudOperation';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    gitUser: gitUser,
    products: userData, 
  },
});
