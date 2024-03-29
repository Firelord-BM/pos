"use client";
import { ComponentToPrint } from "@/components/ComponentToPrint";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer } from "react-toastify";
export default function POSpage() {
  //initialize the state variable as an array
  //products represents the current state value
  //setProducts allows you to update the state
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchProducts = async () => {
    setIsloading(true);
    //api endpoint to fetch products
    const baseUrl = "http://localhost:3000";
    //use axios.get method to make a GET request to the URL (`${baseUrl}/products`)
    const result = await axios.get(`${baseUrl}/products`);
    //setProducts updates the state variable 'products' with data received from the API
    setProducts(await result.data);
    setIsloading(false);
  };

  const addProductToCart = async (product) => {
    console.log(product);
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id == product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = () => {
    handleReactToPrint();
  };

  //use effect to perform side effects eg data fetching, subscriptions or manually fetching the DOM
  useEffect(() => {
    // fetchProducts function will be performed as a side-effect
    fetchProducts();
  }, []);
  //[] is an array of dependencies , when the dependencies change, the effect is re-run

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);
  return (
    <div className="flex justify-between">
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Product List</h1>
          {products.map((item, i) => {
            return (
              <div key={i} className="flex">
                <div
                  className="border-2"
                  onClick={() => addProductToCart(item)}
                >
                  <p>{item.name}</p>
                  <img src={item.image} className="w-40 h-40" alt={item.name} />
                  <p>${item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="">
        <div style={{ display: "none" }}>
          <ComponentToPrint
            cart={cart}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        </div>
        <div className="">
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart ? (
                cart.map((cardItem, i) => {
                  return (
                    <tr key={i}>
                      <td className="px-4 py-2">{cardItem.id}</td>
                      <td className="px-4 py-2">{cardItem.name}</td>
                      <td className="px-4 py-2">{cardItem.price}</td>
                      <td className="px-4 py-2">{cardItem.quantity}</td>
                      <td className="px-4 py-2">{cardItem.totalAmount}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 px-4 py-2 rounded-2xl"
                          onClick={() => removeProduct(cardItem)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>No items to display</p>
              )}
            </tbody>
          </table>

          <h2>Total Amount: KSH.{totalAmount}</h2>
        </div>
        {totalAmount !== 0 ? (
          <div>
            <button
              className="px-4 py-2 rounded-md bg-blue-700"
              onClick={handlePrint}
            >
              Pay Now
            </button>
          </div>
        ) : (
          "Please add a product to the cart"
        )}
      </div>
    </div>
  );
}
