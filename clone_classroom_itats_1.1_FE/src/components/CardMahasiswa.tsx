import React from 'react'
import Image from 'next/image'
import wa from '../../public/wa.svg';
import avatar from '../../public/avatar.svg';


const CardMahasiswa = () => {
  return (
    <div>
      {/* card */}
      <div className="flex justify-between " >
                <div className="flex justify-between  w-full" >

                  <div className=" flex" >
                    <div className="flex items-center pr-8" >
                      <div className=' w-10 h-10 flex  items-center  '>
                        <Image src={avatar} alt='avatar' />
                      </div>
                    </div>

                    <div className="flex " >
                      <div className="pr-4 ">
                        <h2 className="text-[#4723D9]" >Aku Sendiri</h2>
                        <p className=" text-gray-500 text-[10px]" >13.2022.1.01118</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex " >
                      <div className="mt-2 bg-[#4723D9] w-[150px] text-[12px] rounded-xl pl-2 text-white h-5 " >100%</div>
                      <div className="w-[20px] flex items-center "  >
                        <Image src={wa} alt="wa" />
                      </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default CardMahasiswa