'use client'
import { usePathname, useRouter } from 'next/navigation';
import stack from '../../public/stack.svg';
import block from '../../public/block.svg';
import folder from '../../public/folder.svg';
import mark from '../../public/mark.svg';
import book from '../../public/book.svg';
import profile from '../../public/user_white.svg';
import Image from 'next/image';
import Link from 'next/link';

const SidebarDosen: React.FC<{ isOpen: boolean }> = ({isOpen}) => {
  const currentPath = usePathname();

  return (
    <>
      <div className={`
      min-h-screen
      w-[200px]
      bg-[#4723D9] 
      z-10
      max-md:w-[80px]
      fixed
      ${isOpen ? 'sticky top-0' : 'hidden'}
      `}
      >
          <Link href='/dosen/home' >
            <div className={`flex pt-10 pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={stack} alt='folder'/>
              </div>
              <h1 className='pl-4 font-semibold max-md:hidden  text-white' >E-ITATS</h1>
            </div>
          </Link>

        <div className='flex flex-col gap-10 mt-20 '>
        <Link href='/dosen/home' >
            <div className={`${currentPath === '/dosen/kelas/home' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={block} alt='folder'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Home</h1>
            </div>
          </Link>

          <Link href='/dosen/kelas/profile' >
            <div className={`${currentPath === '/dosen/kelas/profile' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={profile} alt='folder'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Profil</h1>
            </div>
          </Link>

          <Link href='/dosen/kelas/tugas' >
            <div className={`${currentPath === '/dosen/kelas/tugas' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={folder} alt='folder'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Tugas</h1>
            </div>
          </Link>

          <Link href='/dosen/kelas/rekap' >
            <div className={`${currentPath === '/dosen/kelas/rekap' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={book} alt='book'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Rekap</h1>
            </div>
          </Link>
          <Link href='/dosen/kelas/forum' >
          {/* flex opacity-50 hover:opacity-100 ml-8 */}
            <div className={`${currentPath === '/dosen/kelas/forum' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={mark} alt='mark'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Forum</h1>
            </div>
          </Link>
          <Link href='/dosen/kelas/presensi' >
            <div className={`${currentPath === '/dosen/kelas/presensi' ?  ' border-l-2 opacity-100 ' : 'opacity-50'} flex  hover:opacity-100  pl-[24px]`}>
              <div className='w-[20px] flex items-center justify-center '>
                <Image src={folder} alt='folder'/>
              </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Presensi</h1>
            </div>
          </Link>
          <Link href='/dosen/kelas/daftar_dosen' >
            <div className={`${currentPath === '/dosen/kelas/daftar_dosen' ?  ' border-l-2 opacity-100  ' : 'opacity-50'} flex hover:opacity-100  pl-[24px]`}>
                <div className='w-[18px] h-[18px] flex items-center justify-center'>
                  <Image src={profile} alt='profile'/>
                </div>
              <h1 className='text-[white] ml-4 max-md:hidden '>Dosen</h1>
            </div>
          </Link>
        </div>
        <Link href='#' >
            <div className='flex opacity-50 hover:opacity-100 ml-8 mt-[130px]'>
              <div className='w-[18px] h-[18px] flex items-center justify-center '>
                <Image src={profile} alt='profile'/>
              </div>
              <h1 className='text-[white] ml-4  max-md:hidden '>Logout</h1>
            </div>
        </Link>

      </div>

    </>
  )
}

export default SidebarDosen