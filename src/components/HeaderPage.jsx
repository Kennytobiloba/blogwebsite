import React from 'react'

const HeaderPage = () => {
  return (
    <div className=' bg-gray-400 hidden  text-black py-4 font-poppins lg:flex'>
        <div className='w-[90%] mx-auto  justify-between flex'>
            {/* adresss */}
        <div className='flex gap-4 items-center justify-center'>
        <span><i className="fa-solid fa-location-dot"></i></span>
        <h3 className='font-bold'> Address:</h3>
        <h5 className='text-sm'> 14 Ojike Street By Azikiwe Road Umuahia</h5>
        </div>

        {/* email */}
        <div className='flex gap-4 justify-center items-center'>
        <span><i className="fa-solid fa-envelope"></i></span>
        <h3 className='font-bold'> Email Address:</h3>
        <h5 className='text-sm'> info@uaapf.org</h5>
        </div>

        {/* icons */}
        <div className='flex gap-4'>
            <span><i className="fa-brands fa-facebook hover:text-blue-600"></i></span>
            <span><i className="fa-brands fa-twitter  hover:text-blue-600"></i></span>
            <span><i className="fa-brands fa-instagram  hover:text-blue-600"></i></span>
            <span><i className="fa-brands fa-linkedin-in  hover:text-blue-600"></i></span>
          </div>
        </div>
      
    </div>
  )
}

export default HeaderPage
