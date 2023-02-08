import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import { BsFillCartPlusFill } from "react-icons/bs";
import { AiFillThunderbolt, AiFillStar } from "react-icons/ai";
import Loader from "@/components/util/Loader";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/app/actions/cart";
import { toast } from "react-toastify";

import Card from "@/components/products/card/Card";
function product() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  ///////////////////////////

  //////////////////////

  const AllProduct = useSelector((e) => e.AllProducts);
  const cartProduct = useSelector((e) => e.Cart);
  const random = useMemo(() => Math.floor(Math.random() * 13), [id]);

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

  const randomProduct = AllProduct.slice(random, random + 5);

  const msg = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const add_to_cart = () => {
    const data = AllProduct.filter((e) => e.id == id);

    ///if product is undefine return///
    if (!data[0]) return;

    let alreadyInCart = false;

    cartProduct.forEach((e) => {
      if (e.id == id) {
        alreadyInCart = true;
        return;
      }
    });

    /////item already in cart
    if (alreadyInCart) {
      msg("All Ready In Cart");
      return;
    }

    dispatch(addToCart(data[0]));
    msg("Added to Cart");
  };
  const buy_now = () => {
    add_to_cart();
    router.push("/cart");
  };

  return (
    <>
      <div className="product_page">
        <div className="product_image">
          <img src={product.image} alt="product image"></img>
        </div>
        <div className="product_details">
          <h2>{product.title}</h2>
          <p id="category">Category:- {product.category}</p>
          <p>Discriptiin:- {product.description}</p>
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
          <div id="buttons">
            <button onClick={add_to_cart} id="cart_btn">
              <BsFillCartPlusFill /> ADD TO CART
            </button>
            <button onClick={buy_now} id="buy_btn">
              <AiFillThunderbolt /> BUY NOW
            </button>
          </div>
        </div>
      </div>
      <div className="product-list">
        {randomProduct.map((e) => (
          <Card key={e.id} props={e} />
        ))}
      </div>
    </>
  );
}

export default product;
