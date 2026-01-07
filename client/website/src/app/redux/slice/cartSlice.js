const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import Cookies from "js-cookie";
let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (thunkAPI) => {
        let token = Cookies.get("token")
        let apiData = await axios.post(`${apiBaseUrl}cart/view-cart`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let data = await apiData.data
        let finalData = await data.cartData
        return finalData ?? []

    },
)


export let cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cart: []
        },
        reducers: {
            // standard reducer logic, with auto-generated action types per reducer
        },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(fetchCart.fulfilled, (state, action) => {
                // Add user to the state array
                state.cart = action.payload
            })
        },

    }
)

export default cartSlice.reducer