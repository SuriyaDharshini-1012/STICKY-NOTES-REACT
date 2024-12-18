import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from './Service/SignUpApi';
import { notesApi } from './Service/NotesApi';


const store = configureStore({
  reducer:{
    [SignupApi.reducerPath]:SignupApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
   },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({}).concat([SignupApi.middleware,notesApi.middleware])
})

export default store;