import React, { useState } from 'react'
import style from "./ForgetPassword.module.css"
import img from '../../assets/Forgot password-pana.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ForgetPassword() {
    const [ApiError, setApiError] = useState('')
    const [ApiSuccess, setApiSuccess] = useState(false)
    const [ApiLoading, setApiLoading] = useState(false)
    const navigate = useNavigate()
    
    async function ForgetPassword(values){
        setApiLoading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
        .then((apiResponse)=>{
            setApiLoading(false);
            setApiSuccess(true);
            setTimeout(()=> navigate('/GetCode') ,1000)
        })
        .catch((apiResponse)=>{
            setApiError(apiResponse?.response?.data?.message);
            setApiLoading(false);
        }
        )
    }

    let ForgetPasswordValidation = Yup.object().shape({
        email:Yup.string().required('Email Is Required').email("In Valid Email"),
    })


    
    const formik = useFormik({
        initialValues: {
            email: '',
    },onSubmit:ForgetPassword,
    validationSchema: ForgetPasswordValidation,
})
    
    return (
        <>


            <div className='lg:flex'>
                <div className='lg:w-1/2 w-full'>
                    <img src={img} className='w-full block' alt="" />
                </div>
                <div className='lg:w-1/2 w-full  flex justify-center items-center'>
                    <div className='w-[90%] space-y-9 '>
                        <h1 className='text-center italic font-serif font-semibold text-3xl md:text-4xl'>Forget Password <i className="fa-solid fa-key"/></h1>
                        {
                            ApiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <p className='italic font-serif '>{ApiError} <i className="fa-solid ms-4 fa-user-xmark"/></p>
                            </div>
                                : null
                        }

                        {
                            ApiSuccess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <p>You Have Been Successfully Reset Your Password <i className="fa-solid ms-3 fa-user-check" /></p>
                            </div>
                                : null
                        }


                        <form onSubmit={formik.handleSubmit} className="mx-auto italic font-serif">
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Your email</label>
                                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" />
                            </div>
                            {
                                formik.errors.email && formik.touched.email && <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {formik.errors.email}
                                    </div>
                                </div>

                            }

                            <button type="submit" className="text-black italic font-serif  bg-main hover:bg-main   font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus-main-800">{ApiLoading ? <i className='fas fa-spinner fa-spin me-2 text-lg'/> : null}Reset Password</button>
                        </form>

                    </div>
                </div>
            </div>



        </>


    )
}
