import Image from 'next/image'
import React from 'react'
import trash from '../../public/trash.svg'
import edit from '../../public/edit.svg'

const DaftarTugasDosenCard = ({index, judul, deadline, editCard, deleteCard}) => {
  return (
    <div className='' >
      <div className=" mb-4 rounded-xl lg:flex lg:justify-between shadow-md p-4 " >
        <div className="" >
          <h2 className="font-bo  ld underline" >Tugas Minggu ke - {index}</h2>
          <div>
            <p><span className="font-bold" >Judul : </span>{judul}</p>
          </div>
          <p className="font-bold" >Batas Pengumpulan : {deadline}</p>
        </div>

        <div className="justify- flex items-center " >
          <div className="" >
            <button
            onClick={editCard}  
            className="bg-yellow-500 p-2 rounded-lg" >
              <Image src={edit} alt='edit'/>
            </button>
            <button
            onClick={deleteCard}
            className="bg-red-500 p-2 rounded-lg " >
              <Image src={trash} alt='trash' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaftarTugasDosenCard