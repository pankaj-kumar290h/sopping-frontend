import { useState,useEffect } from "react";
import {Link} from "next/router";
import Card from "@/components/products/card/Card";
import Navbar from "@/components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import { addProducts } from "@/app/actions/products";
import { useDispatch,useSelector } from "react-redux";



export default function Home() {
  const [AllProduct,setAllProduct] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector(e=>e);
  console.log(product)


  const fetchAllProduct= async()=>{
   const data= await fetch("https://fakestoreapi.com/products").then(data=>data.json());
  //  setAllProduct(data);
  dispatch(addProducts(data));
  }

  useEffect(()=>{
    fetchAllProduct();
  },[])
  if(AllProduct.length==0){
    return <h1>Loading...</h1>
  }
  return (
    <>
    <Provider store={store}>

      <Navbar/>

      <div className="all_Product_display">

      {
        AllProduct.map((product)=> <Card key={product.id} props={product}/>)
      }
      </div>
    
      </Provider>
    </>
  )
}
