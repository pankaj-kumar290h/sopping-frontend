import '@/styles/globals.css'
import "../components/products/card/Card.scss";
import "../styles/product_page.scss"
import "../components/navbar/Navbar.scss"
import "../styles/cart.scss"
import "../components/util/Loader.scss"

import 'react-toastify/dist/ReactToastify.css';
import { wrapper,store } from '@/app/store/store';
import { Provider } from 'react-redux';
import Navbar from '@/components/navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Add_Category } from '@/app/actions/category';

import { ToastContainer } from 'react-toastify';



function App({ Component, pageProps }) {
  const dispatch = useDispatch()
  const fetchCategory= async()=>{

    const data = await fetch("https://fakestoreapi.com/products/categories").then(data=>data.json());
    
    dispatch(Add_Category(data));
}
useEffect(()=>{
  fetchCategory();
},[]);

  return <>
  <Provider store={store}>
    <Navbar/>
    

  <Component {...pageProps} />
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
  </Provider>
  </> 
  
}

export default wrapper.withRedux(App);


