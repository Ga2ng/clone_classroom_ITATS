"use client"
import React, { useState } from "react";
import Footer from "@/components/Footer";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

const RegisterPageDosen = () => {

  const [isNotif,setIsNotif] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/dosen', formData);
      console.log("Pendaftaran berhasil:", response.data);
      // redirect('/');
      setIsNotif(!isNotif);
      setFormData({
        nama: "",
        email: "",
        password: "",
    })
    } catch (error) {
      console.error("Kesalahan saat mendaftar:", error);
    }

  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#F5F1FF]">
        <div className="card bg-white inline-block p-12">
          {isNotif && (
            <div>Registrasi berhasil</div>
          )}
          <h1 className="text-3xl font-bold">Register Dosen</h1>
          <p>dont have account?</p>
          <form className="mt-3 text-[14px]" onSubmit={handleSubmit}>
            <div className="mt-2">
              <label className="block p-2" htmlFor="nama">
                Nama
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="nama"
                placeholder="Nama"
                value={formData.nama}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label className="block p-2" htmlFor="email">
                Email
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full"
                type="text"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label className="block p-2" htmlFor="password">
                Password
              </label>
              <input
                className="outline-none border p-2 rounded-lg w-full "
                type="password"
                name="password"
                placeholder="*******"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="mt-6 bg-blue-600 text-white px-3 py-1 rounded-2xl">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPageDosen;
