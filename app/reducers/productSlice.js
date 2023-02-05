const { createReducer } = require("@reduxjs/toolkit");


const productReducer = createReducer([],(builder)=>{
    builder.addCase("ADD_PRODUCT",(state,action)=>{
        return action.payload;
    })
})


export default productReducer;