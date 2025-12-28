const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";
export let userSlice=createSlice({
    name:"user",
    initialState:{
        token: Cookies.get("token") || null,
    },
    reducers:{
        setToken:(state,action)=>{
            let {payload}=action; //{token:finalRes.token}
            let {token}=payload;
            state.token=token;
            Cookies.set("token",state.token);
        },
        clearToken:(state)=>{
            state.token=null;
            Cookies.remove("token");
        }
    }
})
// Action creators are generated for each case reducer function
export const { setToken, clearToken } = userSlice.actions

export default userSlice.reducer