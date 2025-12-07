'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import {
  Menu,
  X,
  Home,
  DollarSign,
  Compass,
  Info,
  Phone,
  User,
  UserPlus,
  LogIn,
  LayoutDashboard
} from 'lucide-react'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
<<<<<<< Updated upstream
import { useRouter } from 'next/navigation'
import { LibTrackLogo1, LibTrackLogo2, LibTrackLogo3, LibTrackLogo4 } from '../logo'
=======
import { useRouter,usePathname } from 'next/navigation'
>>>>>>> Stashed changes

interface LinkInterface {
  id: number,
  label: string,
  href: string,
  icon: React.ReactNode
}

const LINKS: LinkInterface[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: <Home className="w-5 h-5" />
  },

  {
    id: 3,
    label: "Explore",
    href: "/explore",
    icon: <Compass className="w-5 h-5" />
  },
  {
    id: 4,
    label: "About",
    href: "/about-us",
    icon: <Info className="w-5 h-5" />
  },
  {
    id: 5,
    label: "Contact",
    href: "/contact-us",
    icon: <Phone className="w-5 h-5" />
  },
]

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { userFullData } = useSelector((state: RootState) => state.auth);

const router = useRouter()
const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>

      <nav className='w-full h-14 bg-white border-b border-gray-200 shadow flex items-center justify-between sticky top-0 z-50 px-4 md:px-8'>
   
        <div className='flex items-center justify-center gap-4'>
             <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
          <h2 onClick={()=>router.push("/")} className=" cursor-pointer text-xl font-bold text-gray-800">Libtrack</h2>
          {/* <LibTrackLogo1/>
          <LibTrackLogo2/>
          <LibTrackLogo3/>
          <LibTrackLogo4/> */}
        </div>

 
        <div className='hidden md:flex items-center gap-12'>
          <ul className='flex items-center'>
            {LINKS.map((link) => (
              <Link href={link.href} key={link.id}>
               <li
  className={`
    inline-block px-4 font-medium transition-colors duration-200
    ${pathname === link.href ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-800"}
  `}
>
  {link.label}
</li>
              </Link>
            ))}
          </ul>

       
        </div>

        {
          userFullData ? <>


          <div className='flex items-center gap-4'>

            <Link href={'/dashboard'} className='hidden md:block'>
              <Button className='cursor-pointer'>Dashboard</Button>
            </Link>
          


          <Avatar>
  <AvatarImage src={userFullData.avtar} />
  <AvatarFallback>{userFullData.name[0]}</AvatarFallback>
</Avatar>
          </div>
          
          
          </> : <>
             <div className='space-x-4 '>
            <Button onClick={()=>router.push("/auth/login")} variant={"outline"} className="gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
            <Button onClick={()=>router.push("/auth/register")} className="gap-2 max-md:hidden">
              <UserPlus className="w-4 h-4" />
              Sign-up
            </Button>
          </div>
          </>
        }


     
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'visible' : 'invisible'
          }`}
      >
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-0'
            }`}
          onClick={closeSidebar}
        />

   
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ?'translate-x-0' : '-translate-x-full'
            }`}
        >

 


          <div className="p-4 mt-14">

           
            <ul className="space-y-2">


              {
                userFullData && <li>

                  <Link
                    href={'/dashboard'}
                    onClick={closeSidebar}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    {<LayoutDashboard size={20}/>}
                    <span className="font-medium">Dashbaord</span>
                  </Link>
              </li>
              }

             
              {LINKS.map((link) => (
                <li key={link.id} className={`${pathname === link.href ? "bg-gray-200 text-white rounded-md":""}   `}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>



   
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav