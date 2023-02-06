import { createReducer } from "@reduxjs/toolkit";


const cartReducer = createReducer([],(builder)=>{
    builder.addCase("ADD_ITEM",(state,action)=>{
        state.push(action.payload);
    }).addCase("REMOVE_ITEM",(state,action)=>{
        return state.filter(item=> item.id!==action.payload);
    })
})


export default cartReducer