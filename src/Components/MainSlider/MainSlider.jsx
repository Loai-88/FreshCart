import React from 'react'
import style from "./MainSlider.module.css"
import slider1 from './../../assets/slider-image-1.jpeg'
import slider2 from './../../assets/slider-image-2.jpeg'
import slider3 from './../../assets/slider-image-3.jpeg'
import banner1 from './../../assets/grocery-banner.png'
import banner2 from './../../assets/grocery-banner-2.jpeg'
import banner3 from './../../assets/slider-2.jpeg'
import Slider  from 'react-slick';

export default function MainSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
    };



    return (
        <>

            <div className='flex shadow-lg shadow-gray-600 rounded-xl overflow-hidden'>
                <div className='w-9/12'>
                <Slider {...settings}>
                    <img src={slider3} alt='slider3' className='w-full h-[400px]' />
                    <img src={slider2} alt='slider2' className='w-full h-[400px]' />
                    <img src={banner3} alt='slider1' className='w-full h-[400px]' />
                </Slider>
                </div>
                <div className='w-3/12'>
                    <div className='flex-col'>
                        <img src={banner1} alt="banner1" className='w-full h-[200px]' />
                        <img src={banner2} alt="banner2" className='w-full h-[200px]' />
                    </div>
                </div>
            </div>

        </>


    )
}
