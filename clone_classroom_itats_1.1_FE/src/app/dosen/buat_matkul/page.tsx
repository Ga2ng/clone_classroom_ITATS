"use client";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import axios from "axios";

const RegisterPageMatkul = () => {
  let [formData, setFormData] = useState({
    nama_matkul: "",
    jam_pelajaran: "",
    hari: "",
    kelas: "",
    foto_sampul: null,
    kode_kelas: "",
    dosen_id: localStorage.getItem('id'),
    nama_dosen: localStorage.getItem('nama'),
  });

  // console.log(formData.nama_dosen);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      foto_sampul: file,
    })
    console.log(file)
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

  // const formData = new FormData();
  // formData.append('nama_matkul', formData.nama_matkul);
  // formData.append('jam_pelajaran', formData.jam_pelajaran);
  // formData.append('hari', formData.hari);
  // formData.append('kelas', formData.kelas);
  // formData.append('kode_kelas', formData.kode_kelas);
  // formData.append('foto_sampul', formData.foto_sampul);
  // formData.append('dosen_id', formData.dosen_id);

    try {
      const response = await axios.post('http://localhost:8000/api/matkul', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header untuk pengunggahan file
        },
      });

      setFormData(
        formData = {
          nama_matkul: "",
          jam_pelajaran: "",
          hari: "",
          kelas: "",
          foto_sampul: null,
          kode_kelas: "",
          dosen_id: "",
          nama_dosen: "",
        }
      )

      console.log("Pendaftaran berhasil:", response.data);
    } catch (error) {
      console.error("Kesalahan saat mendaftar:", error);
    }

  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#F5F1FF]">
        <div className="card bg-white  p-6 w-[70%] ">
          <h1 className="text-3xl font-bold">Daftar Mata Kuliah</h1>
          <form className="mt-3 text-[14px] grid grid-cols-4  gap-4" onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
            <div className="mt-2 col-span-2">
              <label className="block p-2" htmlFor="nama_matkul">
                Nama Mata Kuliah
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="nama_matkul"
                placeholder="ex: Matematika "
                value={formData.nama_matkul}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 col-span-2">
              <label className="block p-2" htmlFor="jam">
                Jam Pelajaran
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="jam_pelajaran"
                placeholder="00:00 - 23:00 "
                value={formData.jam_pelajaran}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 col-span-2">
              <label className="block p-2" htmlFor="hari">
                Hari
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="hari"
                placeholder="Senin - Jumat "
                value={formData.hari}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 col-span-2">
              <label className="block p-2" htmlFor="kode_kelas">
                Kode Kelas
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="kode_kelas"
                placeholder="P1"
                value={formData.kode_kelas}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 col-span-2">
              <label className="block p-2" htmlFor="kelas">
                Kelas
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="kelas"
                placeholder="P-091"
                value={formData.kelas}
                onChange={handleChange}
              />
            </div>
              <div className="mt-2 col-span-4 ">
                <label className="block p-2" htmlFor="sampul">
                  Masukan Sampul 
                </label>
                <input
                  className="h-[150px] outline-none border p-2 rounded-lg w-full"
                  type="file"
                  required
                  name="foto_sampul"
                  // value={selectedFile}
                  onChange={handleFileChange}
                  id='sampul'
                />
              </div>

            <button className="mt-6 bg-blue-600 text-white px-3 py-2 rounded-2xl col-span-4">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPageMatkul;
