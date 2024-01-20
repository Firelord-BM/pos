"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
export default function POSpage() {
  //initialize the state variable as an array
  //products represents the current state value
  //setProducts allows you to update the state
  const [products,setProducts] = useState([])
  const [isLoading,setIsloading] = useState(false)
  const [cart,setCart] = useState([])

  const fetchProducts = async() => {
    setIsloading(true)
    //api endpoint to fetch products
    const baseUrl = "http://localhost:3000"
    //use axios.get method to make a GET request to the URL (`${baseUrl}/products`) 
    const result = await axios.get(`${baseUrl}/products`)
    //setProducts updates the state variable 'products' with data received from the API
    setProducts(await result.data);
    setIsloading(false)
  }

  const addProductToCart = async(product) => {
console.log(product)
  }
  //use effect to perform side effects eg data fetching, subscriptions or manually fetching the DOM
  useEffect(()=>{
    // fetchProducts function will be performed as a side-effect
fetchProducts()
  },[])
  //[] is an array of dependencies , when the dependencies change, the effect is re-run
  return (
    <div>
      <h1>Product List</h1>
      {isLoading ? "Loading...": 
      <div>
        {products.map((item,i)=>{return(
          <div key={i} className='flex'>
            <div className="border-2" onClick={()=>addProductToCart(item)}>
                <p>{item.name}</p>
            <img src={item.image} className='w-40 h-40' alt={item.name}/>
            <p>${item.price}</p>
            </div>
          
          </div>
        )})}
        </div>}
    </div>
  )
}
