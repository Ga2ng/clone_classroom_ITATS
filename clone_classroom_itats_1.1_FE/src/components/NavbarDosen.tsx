'use client'
import { usePathname} from 'next/navigation';
import Link from 'next/link'
import React from 'react';
import menu from '../../public/menu.png';
import Image from 'next/image';
import avatar from '../../public/avatar.svg';

const NavbarDosen = ({isOpen, value}) => {
  // const router = useRouter();
  const currentPath = usePathname();
  // console.log(isOpen)

  // fixed top-0 w-full 
  return (
    <div className='' >
      <div className=''>
        <nav className={`
          w-screen flex justify-between p-4 fixed top-0 z-40 bg-[#FFFFFF]
          `}
        >
          <div className='RIGHT flex w-[20%] items-center '>
            <button onClick={() => isOpen()} >
              <div className='w-[28px]'>
                { value ? <p className='font-semibold text-2xl  text-[#764AF1]' >X</p> : <Image src={menu} alt="hamburger_menu" /> }
              </div>
            </button>
            <h1 className='lg:text-2xl md:text-lg  text-[#764AF1] ml-4 font-semibold'>Classroom ITATS</h1>
          </div>

          <div className='CENTER flex lg:gap-8 md:gap-4 font-bold w-[60%] justify-center items-center max-md:hidden'>
            <ul className='hover:text-[#764AF1]'>
              <Link href="/dosen/home">Home</Link>
            </ul>
            {/* <ul className={`hover:text-[#764AF1] ${currentPath === '/dosen/kelas/forum' ? 'text-[#764AF1] ' : 'text-black' } `}>
              <Link href="/dosen/kelas/forum">Forum</Link>
            </ul> */}
            <ul className={`hover:text-[#764AF1] ${currentPath === '/dosen/kelas/presensi' ? 'text-[#764AF1] ' : 'text-black' } `}>
              <Link href="/dosen/kelas/presensi">Presensi</Link>
            </ul>
            <ul className={`hover:text-[#764AF1] ${currentPath === '/dosen/kelas/tugas' ? 'text-[#764AF1] ' : 'text-black' } `}>
              <Link href="/dosen/kelas/tugas">Tugas</Link>
            </ul>
            <ul className={`hover:text-[#764AF1] ${currentPath === '/dosen/kelas/rekap' ? 'text-[#764AF1] ' : 'text-black' } `} >
              <Link href="/dosen/kelas/rekap">Rekap</Link>
            </ul>
            <ul className={`hover:text-[#764AF1] ${currentPath === '/dosen/kelas/daftar_dosen' ? 'text-[#764AF1] ' : 'text-black' } `} >
              <Link href="/dosen/kelas/daftar_dosen">Dosen</Link>
            </ul>
          </div>

          <div className={` LEFT w-[20%] flex justify-end mr-5`}>
            <div className=' w-10 h-10 rounded-full'>
              <Image src={avatar} alt='avatar' />
            </div>
          </div>
        </nav>
        {/* <SidebarManual isOpen={isOpen} /> */}
      </div>
    </div>
  )
}

export default NavbarDosen