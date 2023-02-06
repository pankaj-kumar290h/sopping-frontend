import React from "react";
import { BsCart4 } from "react-icons/bs";
import { RiShoppingBag3Fill } from "react-icons/ri";

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
      <div>
        <Link href="/cart">
          <p>
            <BsCart4 />{TotalItemsInCart.length}
          </p>
        </Link>
        <div className="user_info">
          <p>username</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
