const { configureStore } = require("@reduxjs/toolkit");
import cartSlice  from "../slice/cartSlice";
import userSlice from "../slice/userSlice";

export let store=configureStore({
    reducer:{
        userStore:userSlice, 
        cartStore:cartSlice
    }
})