import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [Loading, setLoading] = useState(true)

    let Headers = {
        token: localStorage.getItem('UserToken')
    };
    const [WishListData, setWishListData] = useState(null)
    const [ wishedItems , setWishedItems] = useState([])

    async function GetAllWishList() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: Headers
        })
            .then((apiResponse) => {
                console.log(apiResponse)
                setWishListProduct(apiResponse.data.data)
                setLoading(false)
                console.log(apiResponse.data.data);
                const wishedlist = apiResponse.data.data.map((product)=>(product._id))
                setWishedItems(wishedlist)
                console.log(wishedItems);
            })
    }

    async function AddToWishList(productId) {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId
            }, {
            headers: Headers
        })
            .then((apiResponse) => {
                console.log(apiResponse)
                toast.success(apiResponse.data.message)
                // setWishListData(apiResponse.data.data)
                // console.log(apiResponse.data.data);
                GetAllWishList()
            })
    }

    const [wishListProduct, setWishListProduct] = useState([]);

    async function DeleteProductsFromWishList(ProductId) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`, {
            headers: Headers
        })
            .then((apiResponse) => {
                console.log(apiResponse.data);
                GetAllWishList()
                toast.success(apiResponse.data.message), {
                    duration: 2000
                }
                GetAllWishList()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    


    useEffect(() => {
        GetAllWishList()
    }, [])

    return (
        <WishListContext.Provider value={{ AddToWishList, DeleteProductsFromWishList, wishListProduct , Loading , GetAllWishList , wishedItems }}>
            {children}
        </WishListContext.Provider>
    )
}
