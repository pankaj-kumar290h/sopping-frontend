import React from 'react'
import { useEffect,useState } from 'react'
const Navbar = () => {

    const [category,setCategory]= useState(null);


    const fetchCategory= async()=>{

        const data = await fetch("https://fakestoreapi.com/products/categories").then(data=>data.json());
        setCategory(data);
    }

    useEffect(()=>{
        fetchCategory();
    },[]);



    if(!category) return <p>Loading Category...</p>

const handleClick =(e)=>{
    console.log(e.target.textContent)

}
  return (
    <div id='navbar'>
        <div id='logo'>
            logo
        </div>
        <div id='catogry-links'>
            <ul onClick={handleClick}>
                {category.map((c,i)=> <li key={i}>{c}</li>)}
                
            </ul>
        </div>
        <div>user</div>

    </div>
  )
}

export default Navbar