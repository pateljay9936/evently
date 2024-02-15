
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton, } from '@clerk/nextjs'
import NavItems from './NavItems'
import MobileNav from './MobileNav'


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
                loading = 'eager'
            />
        </Link>

        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <NavItems />
          </nav>
        </SignedIn>

        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full' size='lg'> 
              <Link href='/sign-in'>LogIn</Link>
            </Button>
          </SignedOut>    
        </div>
        </div>
    </header>
  )
}

