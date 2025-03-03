import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from './../../Context/Context';
import { CartContext } from '../../Context/CartContext';
export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    let { Cart } = useContext(CartContext)
    // console.log(Cart.numOfCartItems);

    let navigate = useNavigate()

    let { UserToken, setUserToken } = useContext(UserContext)

    function Logout() {
        localStorage.removeItem('UserToken');
        navigate('/login');
        setUserToken(null);
    }


    return (
        <>



            <header className="fixed bg-gray-200 inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
                    <div className="flex md:flex-1">
                        <NavLink to={'/'} className="-m-1.5 p-1.5 flex justify-center items-center">
                            <p className='text-2xl font-bold'><i className="fa-solid text-main fa-cart-shopping" />FreshCart</p>
                        </NavLink>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" onClick={() => setIsOpen(true)} className=" hover:bg-gray-400 duration-200 m-0.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700 ">
                            <span className="sr-only">Open main menu</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    {
                        UserToken && <div className="hidden lg:flex lg:gap-x-8">
                            <NavLink to={'/'} className=" text-md focus:text-main hover:text-main duration-200  font-semibold text-gray-900">Home</NavLink>
                            <NavLink to={'cart'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">Carts</NavLink>
                            <NavLink to={'products'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">Products</NavLink>
                            <NavLink to={'categories'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">Categories</NavLink>
                            <NavLink to={'brands'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">Brands</NavLink>
                            <NavLink to={'allorders'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">All Orders</NavLink>
                            <NavLink to={'wishList'} className=" text-md focus:text-main hover:text-main duration-200 font-semibold text-gray-900">WishList</NavLink>
                        </div>
                    }
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                        {/* <div className={style.card}>
                            <Link className={style.socialLink1}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='hover:[fill:#fff]' fill="green" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                            </Link>
                            <Link className={style.socialLink2}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className='hover:[fill:#fff]' fill="green"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg></Link>
                            <Link className={style.socialLink3}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className='hover:[fill:#fff]' fill="green"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" /></svg>
                            </Link>
                            <Link className={style.socialLink4}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='hover:[fill:#fff]' fill="green"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
                            </Link>
                        </div> */}

                        <div className='flex gap-3'>

                            {
                                UserToken ?
                                    <>
                                        <Link to={'/cart'}>
                                            <button data-quantity={Cart.numOfCartItems} className={`${style.btnCart} `}>
                                                <svg className={`${style.iconCart}`} viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                                                    <title>icon-cart</title>
                                                    <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0" />
                                                </svg>
                                                <span className={style.quantity} />
                                            </button>
                                        </Link>
                                        <a onClick={() => Logout()} className={style.animated11}>
                                            <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                            <span className={style.text}>Logout</span>
                                            <span className={style.circle} />
                                            <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                        </a>
                                    </>
                                    : <>
                                        <NavLink to={'login'} className={style.animated}>
                                            <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                            <span className={style.text}>Login</span>
                                            <span className={style.circle} />
                                            <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                        </NavLink>
                                        <NavLink to={'register'} className={style.animated22}>
                                            <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                            <span className={style.text}>Register</span>
                                            <span className={style.circle} />
                                            <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                        </NavLink>
                                    </>

                            }

                        </div>



                    </div>
                </nav>
                {/* Mobile menu, show/hide based on menu open state. */}
                <div className={isOpen ? 'lg:hidden' : 'hidden'} role="dialog" aria-modal="true">
                    {/* Background backdrop, show/hide based on slide-over state. */}
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <div className="flex md:flex-1">
                                <NavLink to={'/'} className="-m-1.5 p-1.5 flex justify-center items-center">
                                    <p className='text-2xl font-bold'><i className="fa-solid text-main fa-cart-shopping" />FreshCart</p>
                                </NavLink>
                            </div>
                            <button type="button" onClick={() => setIsOpen(false)} className="-mx-2.5 duration-200 rounded-md p-2.5 text-gray-700 hover:bg-gray-400">
                                <span className="sr-only">Close menu</span>
                                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                {
                                    UserToken && <div className="space-y-2 py-6">
                                        <NavLink to={'/'} className=" focus:text-main hover:text-main duration-200 -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                                        <NavLink to={'cart'} className=" focus:text-main hover:text-main duration-200 -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Carts</NavLink>
                                        <NavLink to={'products'} className=" focus:text-main hover:text-main duration-200 -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                                        <NavLink to={'categories'} className=" focus:text-main hover:text-main duration-200 -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                                        <NavLink to={'brands'} className=" focus:text-main hover:text-main -mx-3 duration-200 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                                        <NavLink to={'allorders'} className=" focus:text-main hover:text-main -mx-3 duration-200 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">All Orders</NavLink>
                                        <NavLink to={'wishList'} className=" focus:text-main hover:text-main -mx-3 duration-200 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">WishList</NavLink>
                                    </div>
                                }
                                <div className="py-6">

                                    {
                                        UserToken ? <a onClick={() => Logout()}  className={style.animated2}>
                                            <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                            <span className={style.text}>Logout</span>
                                            <span className={style.circle} />
                                            <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                            </svg>
                                        </a>
                                            :
                                            <>
                                                <NavLink to={'login'} className={style.animated}>
                                                    <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                    <span className={style.text}>Login</span>
                                                    <span className={style.circle} />
                                                    <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                </NavLink>
                                                <NavLink to={'register'} className={style.animated3}>
                                                    <svg viewBox="0 0 24 24" className={style.arr2} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                    <span className={style.text}>Register</span>
                                                    <span className={style.circle} />
                                                    <svg viewBox="0 0 24 24" className={style.arr1} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                </NavLink>

                                            </>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </header>


        </>


    )
}
