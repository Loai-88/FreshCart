import React, { useContext, useEffect, useState } from 'react';
import style from "./RecentProducts.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext.jsx';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext.jsx';
import { Heart } from 'lucide-react';


export default function RecentProducts() {
    const navigate = useNavigate()
    const [Products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    let { addProductToCart } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState("");
    let { AddToWishList, DeleteProductsFromWishList, wishedItems } = useContext(WishListContext)


    const filteredProducts = Products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function getProducts() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then((apiResponse) => {
                console.log(apiResponse.data.data);
                setProducts(apiResponse.data.data);
                setLoading(false);
            })
            .catch((apiResponse) => {
                console.log(apiResponse);
                setLoading(false);
            });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {Loading ? (
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
            ) : (
                <>
                    <div className='my-10 flex justify-center'>
                        <div
                            className="relative lg:w-1/2 w-4/5  bg-gray-100 rounded-2xl shadow-md p-1.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-main"
                        >
                            <div
                                className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
                            >
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                                type="text"
                                className="w-full pl-8 pr-24 py-3 text-base text-gray-700 bg-transparent rounded-lg focus:outline-none"
                                placeholder="Search For Products ..."
                            />
                            <button
                                className="absolute rounded-full right-1 top-1 bottom-1 px-6 bg-main text-white font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
                            >
                                Search
                            </button>
                        </div>

                    </div>
                    <div className='flex flex-wrap py-8 gap-y-3 items-center justify-center '>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 overflow-hidden '>

                                <div className="product p-2 rounded-3xl py-4 shadow-md shadow-gray-400 hover:shadow-md ForShadow  hover:shadow-main group  ">
                                    <div onClick={() => navigate(`ProductDetails/${product.id}/${product.category.name}`)} >
                                        <img className='w-full block bg-cover' src={product.imageCover} alt={product.title} />
                                        <div onClick={(e)=>e.stopPropagation()} className='text-main flex justify-between mt-2 font-semibold'><h3>{product.category.name}</h3>
                                            {!wishedItems.includes(product._id) ? <>
                                                <button className='z-50' onClick={(e) => { AddToWishList(product._id); e.stopPropagation() }}><Heart color='#f13' /></button>
                                            </> : <>
                                                <button className='z-50' onClick={(e) => { DeleteProductsFromWishList(product._id); e.stopPropagation() }}><Heart fill='#f13' color='#f13' /></button>
                                            </>}
                                        </div>
                                        <h3 className='text-xl font-semibold'>{product.title.split(' ', 2).join(' ')}</h3>
                                        <div className='flex justify-between'>
                                            <span><span className='text-lg'>price :</span> {product.price} EGP</span>
                                            <span><i className="fa-solid fa-star text-[#FFD43B]" /> {product.ratingsAverage}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => addProductToCart(product.id)} className={`${style.cartBtn} opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0  mt-3 bg-main rounded-full w-full`}>
                                        <svg className={style.cart} fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                        ADD TO CART
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className={`${style.product} sm:left-[228px] md:left-[107px] lg:left-[49px] `}><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </>)}
        </>
    );
}