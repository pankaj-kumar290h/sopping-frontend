

export const  addToCart=(data)=>{


    return {
        type:"ADD_ITEM",
        payload:data,
    }

}

export const removeFromCart = (data)=>{
    return {
        type:"REMOVE_ITEM",
        payload:data,
    }
}