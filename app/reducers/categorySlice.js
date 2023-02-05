const { createReducer } = require("@reduxjs/toolkit");


const categoryReducer = createReducer([],(builder)=>{
    builder.addCase("ADD_CATEGORY",(state,action)=>{
        return action.payload;
    })
})


export default categoryReducer;