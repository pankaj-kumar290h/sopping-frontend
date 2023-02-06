import { useState,useEffect } from "react";
import {Link} from "next/router";
import Card from "@/components/products/card/Card";
import Navbar from "@/components/navbar/Navbar";
import { addProducts } from "@/app/actions/products";
import { useDispatch,useSelector } from "react-redux";
import { Add_Category } from "@/app/actions/category";

import Loader from "@/components/util/Loader";

export default function Home() {

  const dispatch = useDispatch();
  const AllProduct = useSelector(e=>e.AllProducts);

  const fetchAllProduct= async()=>{
   const data= await fetch("https://fakestoreapi.com/products").then(data=>data.json()).catch(err=>console.log(err));

  dispatch(addProducts(data));
  }
  const fetchCategory= async()=>{

    const data = await fetch("https://fakestoreapi.com/products/categories").then(data=>data.json());
    
    dispatch(Add_Category(data));
}

  useEffect(()=>{
    fetchAllProduct();
    // fetchCategory();


  },[])
  if(AllProduct.length==0){
    return <Loader/>
  }
  return (
    <>
    

      

      <div className="all_Product_display">

      {
        AllProduct.map((product)=> <Card key={product.id} props={product}/>)
      }
      </div>
    
    
    </>
  )
}
