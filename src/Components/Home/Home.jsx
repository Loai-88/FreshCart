import React, { useContext } from 'react'
import "./Home.module.css"
import axios from 'axios'
import RecentProducts from './../RecentProducts/RecentProducts.jsx';
import MainSlider from './../MainSlider/MainSlider.jsx';
import CategorySlider from './../CategorySlider/CategorySlider.jsx';
import backgroundImg from './../../assets/light-patten.svg'

export default function Home() {



  return (
    <>
      <div className={`bg-[url(${backgroundImg})] bg-cover bg-repeat`}>
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
      </div>
    </>
  )
}
