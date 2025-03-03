import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { Heart } from 'lucide-react';


export default function ProductDetails() {
    const navigate = useNavigate()
    let settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    let { addProductToCart } = useContext(CartContext)
    let { AddToWishList, DeleteProductsFromWishList, wishedItems } = useContext(WishListContext)



    let { id, category } = useParams(); // byrga3 el parameter ely mawgod fe el path

    const [ProductDetails, setProductDetails] = useState({})
    const [Loading, setLoading] = useState(true)

    async function getProductDetails(ProductId) {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProductId}`)
            .then((apiResponse) => {
                console.log(apiResponse.data.data);
                setLoading(false);
                setProductDetails(apiResponse.data.data)
            })
            .catch((apiResponse) => {
                console.log(apiResponse);
                setLoading(false);
            })
    }

    useEffect(() => {
        getProductDetails(id);
        getRelatedProducts(category);
    }, [id, category])

    const [RelatedProducts, setRelatedProducts] = useState([])
    async function getRelatedProducts(category) {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((apiResponse) => {
                let allProducts = apiResponse.data.data;
                setLoading(false);
                let RelatedProducts = allProducts.filter((product) => product.category.name == category)
                setRelatedProducts(RelatedProducts)
                console.log(RelatedProducts);
            })
            .catch((apiResponse) => {
                console.log(apiResponse);
                setLoading(false);
            })
    }


    return (
        <>

            {
                Loading ? <div className='flex justify-center items-center '> {/* Full height and centered */}
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
                    :
                    <div className='flex flex-wrap'>
                        <div className='lg:w-4/12 w-full'>
                            {/* <img src={ProductDetails.imageCover} className='w-full block' alt={ProductDetails.title} /> */}
                            <Slider {...settings}>
                                {
                                    ProductDetails.images.map((img, index) => {
                                        return <img key={index} src={img} className='w-full block' alt={ProductDetails.title} />
                                    })
                                }
                            </Slider>
                        </div>
                        <div className='lg:w-8/12 p-10 w-full'>
                            <div>
                                <h1 className='text-2xl py-4 font-semibold text-main'><i className="fa-solid fa-cart-flatbed" /> {ProductDetails.title}</h1>
                                <div className='flex justify-between'>
                                    <p className='text-lg py-2 text-gray-700'>{ProductDetails.description}</p>
                                    {!wishedItems.includes(ProductDetails._id) ? <>
                                        <button onClick={(e) => { AddToWishList(ProductDetails._id); e.stopPropagation() }}><Heart className='hover:text-main' color='#f13' /></button>
                                    </> : <>
                                        <button onClick={(e) => { DeleteProductsFromWishList(ProductDetails._id); e.stopPropagation() }}><Heart fill='#f13' color='#f13' /></button>
                                    </>}
                                </div>
                                <div className='flex py-2 justify-between'>
                                    <p className='text-lg font-semibold'>{ProductDetails.category?.name}</p>
                                    {/* <span><span className='text-lg font-semibold'>price :</span> {ProductDetails.price} EGP</span> */}
                                    <span><i className="fa-solid fa-star text-[#FFD43B]" /> {ProductDetails.ratingsAverage}</span>
                                </div>
                            </div>
                            <button onClick={() => addProductToCart(id)} className={`bg-main mt-5 shadow-lg shadow-gray-600 ${style.button1}`}>
                                <div className={style.default1btn}>
                                    <svg viewBox="0 0 24 24" width={20} height={20} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="cart1icon">
                                        <circle cx={9} cy={21} r={1} />
                                        <circle cx={20} cy={21} r={1} />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </div>
                                <div className={style.hover1btn}>
                                    {/* <svg viewBox="0 0 320 512" width="12.5" height={20} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" fill="#ffffff" />
                                    </svg> */}
                                    <span>{ProductDetails.price} EGP</span>
                                </div>
                            </button>
                        </div>

                        <div className='flex flex-wrap py-8 gap-y-3 items-center justify-center'>
                            {RelatedProducts.map((product) => <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 overflow-hidden '>

                                <div className="product p-2 rounded-3xl py-4 shadow-md shadow-gray-400 hover:shadow-md ForShadow  hover:shadow-main group  ">
                                    <div onClick={() => navigate(`ProductDetails/${product.id}/${product.category.name}`)}>
                                        <img className='w-full block bg-cover' src={product.imageCover} alt={product.title} />
                                        <div onClick={(e)=>e.stopPropagation()} className='text-main flex justify-between mt-2 font-semibold'><h3>{product.category.name}</h3>
                                            {!wishedItems.includes(product._id) ? <>
                                                <button onClick={(e) => { AddToWishList(product._id); e.stopPropagation() }}><Heart className='hover:text-main' color='#f13' /></button>
                                            </> : <>
                                                <button onClick={(e) => { DeleteProductsFromWishList(product._id); e.stopPropagation() }}><Heart fill='#f13' color='#f13' /></button>
                                            </>}
                                        </div>
                                        <h3 className='text-xl font-semibold'>{product.title.split(' ', 2).join(' ')}</h3>
                                        <div className='flex justify-between'>
                                            <span><span className='text-lg'>price :</span> {product.price} EGP</span>
                                            <span><i className="fa-solid fa-star text-[#FFD43B]" /> {product.ratingsAverage}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => addProductToCart(product.id)} className={`${style.cartBtn} opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0   mt-3 bg-main rounded-full w-full`}>
                                        <svg className={style.cart} fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                        ADD TO CART
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className={`${style.product} sm:left-[228px] md:left-[107px] lg:left-[49px] `}><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                                    </button>
                                </div>

                            </div>)}

                        </div>
                    </div>

            }




        </>


    )
}
