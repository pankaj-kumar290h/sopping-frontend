import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { AiFillStar, AiFillThunderbolt,AiTwotoneDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import {FcFile} from "react-icons/fc"
import { removeFromCart } from "@/app/actions/cart";
import { toast } from "react-toastify";

const cart = () => {
  const cartProduct = useSelector((e) => e.Cart);
  const dispatch = useDispatch();

  if(cartProduct.length==0) {
    return<>
    <div className="empty_cart">
    <div>
      <FcFile className="file_icon"/>
    <h1>Cart is Empty</h1>
    </div>
    </div>
    </>
  }

  const TotalPrice = cartProduct?.reduce((acc,cur)=>acc+cur.price,0);
  

  const msg =()=>{
    toast.success('Removed From Cart', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  const remove=(id)=>{

    dispatch(removeFromCart(id));
    msg();

  }
  const allProduct = cartProduct.map((product) => {
    return (
      <div key={product.id} className="cart_page">
        <div className="product_image">
          <img src={product.image}></img>
        </div>
        <div className="product_details">
          <h2>{product.title}</h2>
          <p id="category">Category:- {product.category}</p>
          <p>Discription:- {product.description.slice(0,300)}</p>
          <div className="rating">
            <p>
              <span className="star">
                <AiFillStar />
                {product.rating.rate}
              </span>
            </p>
            <p className="count">Count: {product.rating.count}</p>
          </div>
          <h2 id="price">${product.price}</h2>
        </div>
        <button className="remove" onClick={()=>remove(product.id) } ><AiTwotoneDelete/></button>
      </div>
    );
  });



  return (
    <>
    <div className="cart_section">
      
      <div className="cart_product_section">{allProduct}</div>

      <div className="order">
        <h2>PRICE DETAILS</h2>
       <div className="order_details">
        <p>Price</p>
        <p>${TotalPrice}</p>
        <p>Discount</p>
        <p className="green">-$100</p>
        <p>Delivery Charge</p>
        <p className="green">Free</p>
        <p>Total Amount</p>
        <p>${TotalPrice}</p>
        
       </div>
       <h3 className="green">You will save $100 in this order</h3>
       <button>PLACE ORDER</button>
      </div>
    </div>
    </>
  );
};

export default cart;
