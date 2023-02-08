import React from "react";
import { BsCart4 } from "react-icons/bs";
import { RiShoppingBag3Fill } from "react-icons/ri";
import {BiUserCircle} from "react-icons/bi"
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const Navbar = () => {
  const router = useRouter();
  const category = useSelector((e) => e.Category);
  const TotalItemsInCart = useSelector(e=>e.Cart); 

  const handleClick = (e) => {
    router.push(`/category/${e.target.textContent.toLowerCase()}`);
  };
let user;
  if(typeof window !== "undefined"){

    user = JSON.parse(localStorage?.getItem("user"));
  }
  

  const Login = ()=>{
    router.push("/signin")
  }
  const Logout = ()=>{
      localStorage.clear();
      router.push("/")
    
  }
  return (
    <div id="navbar">
      <Link href="/">
        <div id="logo">
          <RiShoppingBag3Fill />
        </div>
      </Link>
      <div id="catogry-links">
        <ul onClick={handleClick}>
          {category.map((c, i) => (
            <li key={i}>{c.toUpperCase()}</li>
          ))}
        </ul>
      </div>
      <div className="user_area">
        <Link href="/cart">
          <p className="cart_icon">
            <BsCart4 /><span id="items_count">{TotalItemsInCart.length}</span>
          </p>
        </Link>
        {user?(<div className="user_info">
          <div>

          <BiUserCircle/>
          <p>{user.username}</p>
          </div>
          <button onClick={Logout}>Logout</button>
          
        </div>):<button className="loginBtn" onClick={Login}>LogIn</button>}
        
      </div>
    </div>
  );
};

export default Navbar;
