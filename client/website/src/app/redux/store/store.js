const { configureStore } = require("@reduxjs/toolkit");
import userSlice from "../slice/userSlice";

export let store=configureStore({
    reducer:{
        userStore:userSlice, 
    }
})