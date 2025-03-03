import React, { useContext, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    let { Cart, UpdateProductsToCart, DeleteProductsCart, DeleteAllCart } = useContext(CartContext);
    const [ProductCarts, setProductCarts] = useState(null);

    // console.log(Cart);

    return (
        <>
            {Cart?.data?.products ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='bg-main'>
                                <th scope="col" className=" px-16 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Cart.data.products.map((item, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={item.product.imageCover} className="w-28 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.product.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={
                                                    item.count > 1
                                                        ? () => UpdateProductsToCart(item.product.id, item.count - 1)
                                                        : () => DeleteProductsCart(item.product.id)
                                                }
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <div className="text-center">
                                                <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    {item.count}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => UpdateProductsToCart(item.product.id, item.count + 1)}
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.price * item.count} EGP
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => DeleteProductsCart(item.product.id)} aria-label="Delete item" className={style.deleteButton}>
                                            <svg className={style.trashSvg} viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
                                                <g id={style.trashCan}>
                                                    <rect x={16} y={24} width={32} height={30} rx={3} ry={3} fill="#e74c3c" />
                                                    <g transformOrigin="12 18" id={style.lidGroup}>
                                                        <rect x={12} y={12} width={40} height={6} rx={2} ry={2} fill="#c0392b" />
                                                        <rect x={26} y={8} width={12} height={4} rx={2} ry={2} fill="#c0392b" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className=' px-6 py-12 justify-around'>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>Total Cart Price :</h1>
                            <p className=' text-xl text-red-600 font-bold'>
                                {Cart.data.totalCartPrice}
                                <span className='text-black'>
                                    EGP
                                </span>
                            </p>
                        </div>
                        <Link to={'/CheckOut'} className='flex justify-center mt-5'>
                            <button className={`${style.Btn22} rounded-full`}>
                                Check Out
                                <svg className={style.svgIcon22} viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" /></svg>
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <div className='flex px-6 py-12 justify-center'>
                        <button onClick={() => DeleteAllCart()} className={style.button5}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" className={`${style.svgIcon5} ${style.binTop5}`}>
                                <g clipPath="url(#clip0_35_24)">
                                    <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_35_24">
                                        <rect fill="white" height={14} width={69} />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className={`${style.svgIcon5} ${style.binBottom5}`}>
                                <g clipPath="url(#clip0_35_22)">
                                    <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_35_22">
                                        <rect fill="white" height={57} width={69} />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>

                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center '> {/* Full height and centered */}
                    <div className={`${style.loader}  p-36`}>
                        <div className={style.truckWrapper}>
                            <div className={style.truckBody}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className={style.trucksvg}>
                                    <path strokeWidth={3} stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z" />
                                    <path strokeWidth={3} stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z" />
                                    <path strokeWidth={2} stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z" />
                                    <rect strokeWidth={2} stroke="#282828" fill="#FFFCAB" rx={1} height={7} width={5} y={63} x={187} />
                                    <rect strokeWidth={2} stroke="#282828" fill="#282828" rx={1} height={11} width={4} y={81} x={193} />
                                    <rect strokeWidth={3} stroke="#282828" fill="#DFDFDF" rx="2.5" height={90} width={121} y="1.5" x="6.5" />
                                    <rect strokeWidth={2} stroke="#282828" fill="#DFDFDF" rx={2} height={4} width={6} y={84} x={1} />
                                </svg>
                            </div>
                            <div className={style.truckTires}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className={style.tiresvg}>
                                    <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
                                    <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className={style.tiresvg}>
                                    <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
                                    <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
                                </svg>
                            </div>
                            <div className={style.road} />
                            <svg xmlSpace="preserve" viewBox="0 0 453.459 453.459" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" fill="#000000" className={style.lampPost}>
                                <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
                                            c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
                                            c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
                                            c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
                                            h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
                                            v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
                                            V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
                                            M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
                                            h78.747C231.693,100.736,232.77,106.162,232.77,111.694z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}