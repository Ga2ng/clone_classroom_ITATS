'use client';
import axios from 'axios';
import React,{ useState } from 'react'
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { push } = useRouter();

  const [isNotif, setIsNotif] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      await axios.post('http://127.0.0.1:8000/api/mahasiswa/login', formData)
      .then(response => {
        console.log("login berhasil", response.data);
        const token = response.data.access_token;
        const dataUser = {
          email : response.data.user.email,
          nama : response.data.user.nama,
          id : response.data.user.id,
        }

        // console.log(token);
        // Simpan token di localStorage atau tempat penyimpanan lainnya
        localStorage.setItem('access_token', token);
        localStorage.setItem('email', dataUser.email);
        localStorage.setItem('nama', dataUser.nama);
        localStorage.setItem('id', dataUser.id);

        push('/mahasiswa/home');
      })
      .catch(error => {
        console.error("Login gagal", error)
        setIsNotif(!isNotif);
      })

      await axios.post('http://127.0.0.1:8000/api/dosen/login', formData)
      .then(response => {
        console.log("login berhasil", response.data);
        const token = response.data.access_token;
        const dataUser = {
          email : response.data.user.email,
          nama : response.data.user.nama,
          id : response.data.user.id,
        }

        // console.log(token);
        // Simpan token di localStorage atau tempat penyimpanan lainnya
        localStorage.setItem('access_token', token);
        localStorage.setItem('email', dataUser.email);
        localStorage.setItem('nama', dataUser.nama);
        localStorage.setItem('id', dataUser.id);

        push('/dosen/home');
      })
      .catch(error => {
        console.error("Login gagal", error)
        setIsNotif(!isNotif);
      })
  }
  

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-[#F5F1FF]' >
  
        <div className='card bg-white inline-block p-12 w-[350px]'>
          <h1 className='text-3xl font-bold' >Login</h1>
          
          <form className='mt-3 text-[14px]' onSubmit={handleSubmit} >
            <div className='mt-2'>
              <label className='block p-2' htmlFor="Email">Email</label>
              <input 
                className='outline-none border p-2 rounded-lg w-full' 
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className='mt-2'>
              <label className='block p-2' htmlFor="">Password</label>
              <input 
                className='outline-none border p-2 rounded-lg w-full' 
                type="password" 
                placeholder='*******'
                name='password'
                value={formData.password} 
                onChange={handleChange}
              />
            </div>
            {
              isNotif && (
                <p className='text-red-500 mt-6 whitespace-normal' >Password atau email anda salah silahkan coba lagi</p>
              )
            }
            <button className='mt-6 bg-blue-600 text-white px-6 py-1 rounded-2xl' >Login</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default LoginPage;