import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export let CartContext = createContext();


export default function CartContextProvider({ children }) {
    let Headers = {
        token: localStorage.getItem('UserToken')
    };
    const [Cart, setCart] = useState({})
    async function addProductToCart(productId) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId:productId
        }, {
            headers:Headers
        })
            .then((apiResponse) => {
                // console.log(apiResponse.data);
                getProductsCart();
                toast.success(apiResponse.data.message , {
                    duration:2000
                })
            })
            .catch((error) => {
                // console.log(error)
                toast.error(apiResponse.data.message)
            })
    }

    async function getProductsCart() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers:Headers
        })
            .then((apiResponse) => {
                // console.log(apiResponse.data);
                setCart(apiResponse.data);
            })
            .catch((error) => {
                console.log(error)
                toast.error(apiResponse.data.message)
            })
    }

    async function UpdateProductsToCart(ProductId , count) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart//${ProductId}`, { count : count } ,{
            headers:Headers
        })
            .then((apiResponse) => {
                // console.log(apiResponse.data);
                setCart(apiResponse.data);
                toast.success(apiResponse.data.status), {
                    duration:2000
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function DeleteProductsCart(ProductId , count) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart//${ProductId}`,{
            headers:Headers
        })
            .then((apiResponse) => {
                console.log(apiResponse.data);
                setCart(apiResponse.data);
                toast.success(apiResponse.data.status), {
                    duration:2000
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function DeleteAllCart() {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:Headers
        })
            .then((apiResponse) => {
                // console.log(apiResponse.data);
                setCart(apiResponse.data);
                toast.success('All Products Deleted Successfully'), {
                    duration:2000
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getProductsCart();
    },[])
    return (
        <CartContext.Provider value={{addProductToCart , Cart , UpdateProductsToCart , DeleteProductsCart , DeleteAllCart}}>
            {children}
        </CartContext.Provider>
    )
}
