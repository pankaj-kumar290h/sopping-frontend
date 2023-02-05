import React from 'react'
import { useRouter } from 'next/router';

const card = ({props}) => {
    const router = useRouter();

    const {id,title,price,rating,image} = props;

    const productRouteHandler =(id)=>{
        router.push(`/product/${id}`)



    }
  return (
    <div onClick={()=>productRouteHandler(id)} className='card'>
        <div className='card_body'>
            <div className='image'>
                <img src={image} />
            </div>
            <div className='title'>
                
            <h4>{title}</h4>
            </div>
            <p>${price}</p>
            <div className='rating'>
                <p><span className='star'> {rating.rate}</span></p>
                <p className='count'>Count: {rating.count}</p>
            </div>
        </div>
    </div>
  )
}

export default card