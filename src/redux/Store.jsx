import { configureStore } from '@reduxjs/toolkit';
import { SignupApi } from './Service/SignUpApi';




const store = configureStore({
  reducer:{
    [SignupApi.reducerPath]:SignupApi.reducer,
    
},
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({}).concat([SignupApi.middleware])
})

export default store;