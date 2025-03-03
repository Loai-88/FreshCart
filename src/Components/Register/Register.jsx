import React, { useContext, useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import values from './../../../node_modules/lodash-es/values';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
export default function Register() {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('')
    const [apiSuccess, setApiSuccess] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)
    let { setUserToken } = useContext(UserContext)
    async function register(values) {
        setIsLoading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .then((apiResponse) => {
                setApiSuccess(true);
                setIsLoading(false);
                setTimeout(() => navigate('/'), 1000);
                localStorage.setItem('UserToken', apiResponse.data.token);
                setUserToken(apiResponse.data.token);
            }) // in valid
            .catch((apiResponse) => { setApiError(apiResponse?.response?.data?.message); setIsLoading(false) }); //in error
        // console.log(data);
        // console.log(values);
        // console.log(data.message);
        // if(data.message=='success')
        // {
        //     navigate('/home')
        // }else{
        //     log(data.message);
        // }
    }

    // function validation(values) {
    //     let errors = {};
    //     if (!values.name) {
    //         errors.name = "name is required"
    //     } else if (!/^[A-Z]\w{3,15}$/.test(values.name)) {
    //         errors.name = 'name in valid ex(Mohamed)'
    //     }

    //     return errors
    // }
    // .max( 15 ,'max is 15 character')
    let validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required').min(4, 'min is 4 character'),
        email: Yup.string().required('Email is Required').email('email invalid'),
        password: Yup.string().required('Password Required').matches(/^[A-Z]\w{4,20}$/, 'invalid password ex(Ahmed123)'),
        rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')], 'password and rePassword do not match'),
        phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Phone Number Must Be Valid Egyptian Number'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }, validationSchema: validationSchema
        , onSubmit: register
    })


    return (
        <>




            <div className='mx-auto mt-5 mb-32'>
                <div className='w-[100%] mt-24 italic font-serif'>
                    <div className='font-semibold text-green-800 text-center text-3xl mb-9 italic font-serif'>
                        <h1>Register <i className="fa-solid fa-id-card"></i></h1>
                    </div>

                    {
                        apiError ? <div className="flex  items-center p-4 mb-8 mt-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {apiError} !
                            </div>
                        </div>
                            : null
                    }

                    {
                        apiSuccess ? <div className="flex items-center p-4 mb-8 mt-6 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Register is Success</span>
                            </div>
                        </div>
                            : null
                    }

                    <form onSubmit={formik.handleSubmit} className=" mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className=" block py-2.5 px-0 w-full text-sm  italic font-serif  text-black bg-transparent border-0 border-b-2 border-main appearance-none dark:text-black dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                        </div>
                        {formik.errors.name && formik.touched.name &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.name}
                                </div>
                            </div>

                        }
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm italic font-serif  text-black bg-transparent border-0 border-b-2 border-main appearance-none dark:text-black dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        {formik.errors.email && formik.touched.email &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.email}
                                </div>
                            </div>

                        }
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full italic font-serif  text-sm text-black bg-transparent border-0 border-b-2 border-main appearance-none dark:text-black dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        {formik.errors.password && formik.touched.password &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.password}
                                </div>
                            </div>

                        }
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full  italic font-serif text-sm text-black bg-transparent border-0 border-b-2 border-main appearance-none dark:text-black dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
                            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        {formik.errors.rePassword && formik.touched.rePassword &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.rePassword}
                                </div>
                            </div>

                        }
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-black  italic font-serif bg-transparent border-0 border-b-2 border-main appearance-none dark:text-black dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                        </div>
                        {formik.errors.phone && formik.touched.phone &&
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.phone}
                                </div>
                            </div>

                        }


                        <button type="submit" className="text-black mt-2  bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main  rounded-full text-md italic font-serif font-medium w-full px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-bg-green-500">{IsLoading ? <i className='fas fa-spinner fa-spin me-2 text-lg'></i> : null} Register </button>
                    </form>
                </div>
            </div>





        </>


    )
}

