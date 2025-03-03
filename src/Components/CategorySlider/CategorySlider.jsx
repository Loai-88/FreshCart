import React, { useEffect, useState } from 'react'
import style from "./CategorySlider.module.css"
import axios from 'axios'
import Slider from 'react-slick';
export default function CategorySlider() {

    let settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const [Categories, setCategories] = useState([])

    async function GetCategories() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((apiResponse) => {
                console.log(apiResponse.data.data);
                setCategories(apiResponse.data.data);
            })
            .catch((apiResponse) => {
                console.log(apiResponse);
            })
    }
    useEffect(() => {
        GetCategories()
    }, [])


    return (
        <>
            <Slider {...settings}>
                {
                    Categories.map((Category, index) => {
                        return <div className='p-2' key={index}> <div className=' my-3 shadow-lg shadow-gray-600 rounded-xl overflow-hidden '>
                            <img src={Category.image} alt={Category.name} className='w-full h-[200px] object-cover object-top block' />
                            <h3 className='text-md font-semibold text-center'>{Category.name}</h3>
                        </div>
                        </div>
                    })
                }
            </Slider>



        </>


    )
}
