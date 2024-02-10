import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer(){
  return (
    <footer className='border-t'>
      <div className='flex flex-col flex-center flex-between wrapper p-5 gap-4 text-center sm:flex-row'>
        <Link href='/'>
          <Image 
              src='assets/images/logo.svg' 
              alt='Evently' 
              width={128} 
              height={38}
          />
        </Link>
        <p>2024 Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}

