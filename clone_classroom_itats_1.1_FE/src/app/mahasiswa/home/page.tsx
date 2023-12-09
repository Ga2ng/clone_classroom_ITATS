"use client";
import AuthToken from "@/app/AuthToken";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { FetchMatkul } from "@/app/ApiFetchMatkul";

const Home = () => {
  const token = AuthToken();
  const { push } = useRouter();
  token ? "" : push("/");

  const [dataMatkul,  setDataMatkul] = useState([]);

  useEffect(() => {
    FetchMatkul()
    .then((data) => {
      // console.log(data);
      setDataMatkul(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const getMatkulId = (id, nama) => {
    localStorage.setItem('matkul_id', JSON.stringify(id));
    localStorage.setItem('nama_matkul', nama);
  }
  // bg-[#F5F3F4]
  return (
    <div className="">
      <Navbar />
      <section className="mx-8 max-sm:mx-4 ">
        <h1 className="text-[45px] font-bold pt-4 max-sm:text-[30px] ">
          Anda memiliki {dataMatkul.length} Mata Kuliah{" "}
        </h1>
        <p className="pt-4">
          We have professional alliance&apos;s with leading Universities and
          Colleges around the world.
        </p>

        <div className="bg-white rounded-lg mt-20 flex justify-between max-md:hidden ">
          <div className="p-4">
            <p className="pl-2 ">Tahun ajaran</p>
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                2023-2024 Gasal
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center p-4">
            <Link
              href={"/mahasiswa/pilih_matkul"}
              className="btn leading-[2px] font-bold p-8"
            >
              Pilih Mata Kuliah
            </Link>
          </div>
        </div>
      </section>

        {dataMatkul.length == null
        ? ( <h1 className="text-[30px] text-center my-[150px]" >Silahkan pilih mata kuliah terlebih dahulu</h1> ) 
        : (<section className="mx-8 mt-20 gap-6  mb-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
            {dataMatkul.map((item, index) => (
              <div key={index} onClick={() => getMatkulId(item.id, item.nama_matkul)} >
                <Card 
                  namaDosen={item.nama_dosen}
                  namaMatkul={item.nama_matkul}
                  kelas={item.kelas}
                  kodeKelas={item.kode_kelas}
                  hari={item.hari}
                  jam={item.jam_pelajaran}
                  goto={'/mahasiswa/kelas/forum'}
                />
              </div>
            ))}
            </section>
            )
        }
      <Footer />
    </div>
  );
};

export default Home;
