import React, { useContext, useState } from 'react'
import style from "./CheckOut.module.css"
import img from './../../assets/Ecommerce checkout laptop-rafiki.png'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios, { Axios } from 'axios'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from './../../Context/Context';
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
export default function CheckOut() {

    let navigate = useNavigate()
    const [ApiSuccess, setApiSuccess] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)
    const [ApiError, setApiError] = useState('')
    let { Cart } = useContext(CartContext)


    async function CheckOut(shippingAddress) {
        setIsLoading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Cart.cartId}?url=http://localhost:5175`, {
            shippingAddress: shippingAddress
        }, {
            headers:{ 
                token : localStorage.getItem('UserToken')
            }
        })
            .then((apiResponse) => {
                setApiSuccess(true);
                setIsLoading(false);
                // setTimeout(() => navigate('/'), 1000);
                console.log(apiResponse.data);
                toast.success(apiResponse.data.status)
                setTimeout(()=>location.href = apiResponse.data.session.url ,1000)
            })
            .catch((apiResponse) => {
                // setApiError(apiResponse?.response?.data?.message);
                setIsLoading(false);
            })
    }

    const formik = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: '',
        }, onSubmit: CheckOut
    })

    return (
        <>


            <div className='lg:flex'>
                <div className='lg:w-1/2 w-full'>
                    <img className='w-full block' src={img} alt="CheckOutImg" />
                </div>
                <div className='lg:w-1/2 w-full flex justify-center items-center' >
                    <div className='w-[90%] space-y-9'>
                        <h1 className='text-center italic font-serif font-semibold text-5xl'>CheckOut <i class="fa-solid ms-3 fa-money-check-dollar"/></h1>

                        <form onSubmit={formik.handleSubmit} className="mx-auto italic font-serif">
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your City</label>
                                <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your City" />
                            </div>




                            <div className="mb-5">
                                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your Details</label>
                                <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Your Details' />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your Phone</label>
                                <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your Your Phone' />
                            </div>

                            <button type="submit" className="text-black italic font-serif  bg-main hover:bg-main   font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus-main-800">{IsLoading ? <i className='fas fa-spinner fa-spin me-2 text-lg'></i> : null}CheckOut</button>
                        </form>
                    </div>
                </div>
            </div>



        </>


    )
}
