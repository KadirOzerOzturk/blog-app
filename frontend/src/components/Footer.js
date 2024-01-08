/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Footer() {
  return (
    <div className=''>


   
        <div className="w-full   bg-white  shadow dark:bg-gray-800 m-4  mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center flex justify-between items-center sm:justify-between">
                
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
   
    </div>
  )
}

