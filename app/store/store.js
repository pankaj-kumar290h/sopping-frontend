import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../reducers/productSlice";




const store = configureStore({
    reducer:{
        AllProducts:productReducer,

    }
})

export default store;