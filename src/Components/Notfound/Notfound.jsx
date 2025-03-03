import React from 'react'
import style from "./Notfound.module.css"
import img from '../../assets/404 Error-cuate.png'
export default function Notfound() {
    return (
        <>


        <div className='flex justify-center items-center'>
            <div className='w-full lg:w-1/2'><img src={img} className='w-full block' alt="Error 404" /></div>
        </div>



        </>


    )
}
