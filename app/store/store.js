import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "../reducers/productSlice";
import categoryReducer from "../reducers/categorySlice";
import cartReducer from "../reducers/cartSlice";



 export const store = configureStore({
    reducer:{
        AllProducts:productReducer,
        Category:categoryReducer,
        Cart:cartReducer,

    }
})

const makeStore =()=> store;

export const wrapper = createWrapper(makeStore);