import React, { useState } from 'react';
import { InputOtp } from "@heroui/react";
import style from "./GetCode.module.css";
import img from '../../assets/Enter OTP-amico.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GetCode() {
    const [ApiError, setApiError] = useState('');
    const [ApiSuccess, setApiSuccess] = useState(false);
    const [ApiLoading, setApiLoading] = useState(false);

    const navigate = useNavigate();

    const ForgetPassword = async (values) => {
        setApiLoading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then((apiResponse) => {
                setApiLoading(false);
                setApiSuccess(true);
                setTimeout(() => navigate('/resetpassword'), 1000);
            })
            .catch((error) => {
                setApiError(error?.response?.data?.message || 'An error occurred');
                console.log(error);
                
                setApiLoading(false);
            });
    };

    const ForgetPasswordValidation = Yup.object().shape({
        resetCode: Yup.string()
            .required('The Code Is Required')
            .length(6, 'The Code must be exactly 6 digits'), // Only enforce exact length
    });

    const formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema: ForgetPasswordValidation,
        onSubmit: ForgetPassword,
    });

    return (
        <div className='lg:flex'>
            <div className='lg:w-1/2 w-full'>
                <img src={img} className='w-full block' alt="" />
            </div>
            <div className='lg:w-1/2 w-full flex justify-center items-center'>
                <div className='w-[90%] space-y-9'>
                    <h1 className='text-center italic font-serif font-semibold text-3xl md:text-4xl'>
                        Get Code <i className="fa-solid fa-unlock-keyhole" />
                    </h1>
                    {ApiError && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p className='italic font-serif'>{ApiError} <i className="fa-solid ms-4 fa-user-xmark" /></p>
                        </div>
                    )}
                    {ApiSuccess && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <p>You Have Been Successfully Reset Your Password <i className="fa-solid ms-3 fa-user-check" /></p>
                        </div>
                    )}
                    <form onSubmit={formik.handleSubmit} className="mx-auto italic font-serif">
                        {/* Centered div */}
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-default-500 text-center text-small mb-2">Enter 6 digits OTP</p>
                            <div className="flex justify-center">
                                <InputOtp
                                    length={6}
                                    id="resetCode"
                                    name="resetCode"
                                    className="mb-5"
                                    value={formik.values.resetCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errorMessage
                                />
                            </div>
                        </div>
                        {formik.errors.resetCode && formik.touched.resetCode && (
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.resetCode}
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="text-black italic font-serif bg-main hover:bg-main font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus-main-800"
                            disabled={ApiLoading}
                        >
                            {ApiLoading ? <i className='fas fa-spinner fa-spin me-2 text-lg' /> : null}
                            Send Code
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}