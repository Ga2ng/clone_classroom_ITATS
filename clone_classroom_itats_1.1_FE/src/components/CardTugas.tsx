import React from "react";

export const CardTugas = ({index, judul, deadline, instruksi}) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-xl container hover:shadow-xl ">
        <h1 className="font-bold underline pb-4">Minggu ke-{index} </h1>
        <div className="bg-[#CFF4FC] p-4 rounded-lg ">
          <h2 className="font-bold pb-8">Capaian Pembelajaran : {judul}</h2>
          <h3 className="font-bold pb-10">Rencana Pembelajaran :  {instruksi}</h3>
          <button className="btn btn-outline btn-info">Materi</button>
        </div>
        <div className="flex justify-between mt-8 ">
          <div>
            <h2 className="underline font-bold" >Tugas</h2>
            <div><span className="underline font-bold" >Judul : </span>{judul}</div>
            <div><span className="underline font-bold" >Batas Pengumpulan : </span>{deadline}</div>
            <div><span className="underline font-bold">Instruksi : </span>{instruksi}</div>
          </div>
          {/* <label
            htmlFor="#"
            className="bg-red-500 text-white rounded-xl px-2 text-[14px] flex items-center h-5 mt-4 font-semi-bold"
          >
          </label> */}
          <div className="" >
            <button className="bg-blue-600 text-white p-2 rounded-lg">
              Unggah Tugas
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-8 border  " />
    </div>
  );
};
