import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/Navbar";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiFillThunderbolt, AiFillStar } from "react-icons/ai";
import Loader from "@/components/util/Loader";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "@/app/actions/cart";
import Card from "@/components/products/card/Card";
function product() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  

  

  const AllProduct = useSelector((e) => e.AllProducts);

  const [product, setProduct] = useState(null);

  const fetchSingleProduct = async (id) => {
    if (!id) return;

    const data = await fetch(`https://fakestoreapi.com/products/${id}`)
      .then((pro) => pro.json())
      .catch((err) => console.log(err));

    setProduct(data);
  };

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (!product) {
    return <Loader />;
  }


  const add_to_cart = ()=>{
   const data= AllProduct.filter(e=>e.id==id);
    
    dispatch(addToCart(data[0]));

  }

  return (
    <>
      <div className="product_page">
        <div className="product_image">
          <img src={product.image}></img>
        </div>
        <div className="product_details">
          <h2>{product.title}</h2>
          <p id="category">Category:- {product.category}</p>
          <p>Discriptiin:- {product.description}</p>
          <div className="rating">
            <p>
              <span className="star">
                {" "}
                <AiFillStar />
                {product.rating.rate}
              </span>
            </p>
            <p className="count">Count: {product.rating.count}</p>
          </div>
          <h2 id="price">${product.price}</h2>
          <div id="buttons">
            <button onClick={add_to_cart} id="cart_btn">
              <BsFillCartPlusFill /> ADD TO CART
            </button>
            <button id="buy_btn">
              <AiFillThunderbolt /> BUY NOW
            </button>
          </div>
        </div>
      </div>
      <div className="product-list">
        {AllProduct.map((e) => (
          <Card key={e.id} props={e} />
        ))}
      </div>
    </>
  );
}

export default product;
