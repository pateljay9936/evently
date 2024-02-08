import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Header(){
  return (
    <header className='border-b w-full'>
        <div className='wrapper flex items-center justify-between '>
        <Link href='/'>
            <Image 
                src='assets/images/logo.svg' 
                alt='Evently' 
                width={128} 
                height={38} 
            />
            <div className='flex w-32 justify-end gap-3'>
                
            </div>
        </Link>
        </div>
    </header>
  )
}

