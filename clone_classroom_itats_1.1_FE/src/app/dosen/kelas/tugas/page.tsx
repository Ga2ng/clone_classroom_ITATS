"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationDosen from "@/layout/NavigationDosen";
import DaftarTugasDosenCard from "@/components/DaftarTugasDosenCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const TugasDosenPage = () => {
  let [formData, setFormData] = useState({
    judul_tugas: "",
    deadline: "",
    instruksi: "",
    materi: null,
    id: "",
    matkul_id: localStorage.getItem("matkul_id"),
  });

  const nama_matkul = localStorage.getItem("nama_matkul");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      materi: file,
    });
    console.log(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isNotifTrue, setisNotifTrue] = useState(false);
  useEffect(() => {
    if (isNotifTrue) {
      const timer = setTimeout(() => {
        setisNotifTrue(false); // Setelah 2-3 detik, hilangkan notifikasi
      }, 3000); // 2000 milidetik = 2 detik, sesuaikan dengan kebutuhan Anda

      return () => {
        clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
      };
    }
  }, [isNotifTrue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add_tugas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set header untuk pengunggahan file
          },
        }
      );

      setFormData({
        judul_tugas: "",
        deadline: "",
        instruksi: "",
        materi: null,
        id: "",
        matkul_id: localStorage.getItem("matkul_id"),
      });

      setisNotifTrue(true);
      console.log("Pendaftaran berhasil:", response.data);
    } catch (error) {
      console.error("Kesalahan saat mendaftar:", error);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Membuat fungsi async
      const matkul_id = localStorage.getItem("matkul_id");
      const data = { matkul_id: matkul_id };
      try {
        const response = await axios.post(
          "http://localhost:8000/api/get_tugas",
          data
        );
        // console.log(response.data)
        setData(response.data); // Mengisi state data dengan data dari respons
      } catch (error) {
        console.error(error);
      }
    };
      if (formData) { // Hanya memicu permintaan ketika formData berubah dan tidak null
        fetchData();
      }
  }, [formData]);

  const [edit, setEdit] = useState(false);
  const isEdit = (id, judul) => {
    setEdit(!edit);
    // console.log(id);

    setFormData({
      ...formData,
      id: id,
      judul_tugas: judul,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/edit_tugas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set header untuk pengunggahan file
          },
        }
      );

      setFormData({
        judul_tugas: "",
        deadline: "",
        instruksi: "",
        materi: null,
        id: "",
        matkul_id: localStorage.getItem("matkul_id"),
      });
      console.log("Edit berhasil", response.data);
      setEdit(!edit)
    } catch (error) {
      console.error("Kesalahan saat edit", error);
    }
  };

  // Delete Function
  const [destroy, setDestroy] = useState(false);
  const isDelete = async (id) => {
    id = parseInt(id);
    setDestroy(!destroy);
    // console.log(id);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/delete_tugas",
          {id},
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set header untuk pengunggahan file
            },
          }
        );   
        console.log("Hapus berhasil:", response.data);
      } catch (error) {
        console.error("Kesalahan saat menghapus:", error);
      }
  };

  useEffect(() => {
    if(destroy === true){
      const fetchData = async () => {
        // Membuat fungsi async
        const matkul_id = localStorage.getItem("matkul_id");
        const data = { matkul_id: matkul_id };
        try {
          const response = await axios.post(
            "http://localhost:8000/api/get_tugas",
            data
          );
          // console.log(response.data)
          setData(response.data); // Mengisi state data dengan data dari respons
        } catch (error) {
          console.error(error);
        }
      };
      fetchData()
    }
  },[destroy])

  return (
    <>
      <NavigationDosen>
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
          <div className="card bg-white  p-6 w-[70%] ">
            <h1 className="text-3xl font-bold">
              Mata Kuliah <span className="text-[blue]">{nama_matkul}</span>{" "}
            </h1>
            <h1 className="text-3xl font-bold mt-4">Input Tugas</h1>

            {isNotifTrue && (
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{
                  duration: 1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="alert alert-success w-fit ml-8 mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Tugas berhasil ditambahkan</span>
              </motion.div>
            )}
            <form
              className="mt-3 text-[14px] gap-4"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="mt-2 col-span-2">
                <label className="block p-2" htmlFor="judul_tugas">
                  Judul
                </label>
                <input
                  className="outline-none border p-2 rounded-lg w-full"
                  type="text"
                  name="judul_tugas"
                  placeholder="ex: Ujian Tengah Semester "
                  value={formData.judul_tugas}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 col-span-2">
                <label className="block p-2" htmlFor="deadline">
                  Batas Pengumpulan
                </label>
                <input
                  className="outline-none border p-2 rounded-lg w-full"
                  type="text"
                  name="deadline"
                  placeholder="00:00 - 23:00 "
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 col-span-2">
                <label className="block p-2" htmlFor="instruksi">
                  Instruksi
                </label>
                <input
                  className="outline-none border p-2 rounded-lg w-full"
                  type="text"
                  name="instruksi"
                  placeholder="Instruksi"
                  value={formData.instruksi}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 col-span-4 ">
                <label className="block p-2" htmlFor="materi">
                  Materi
                </label>
                <input
                  className="h-[150px] outline-none border p-2 rounded-lg w-full"
                  type="file"
                  required
                  name="foto_sampul"
                  // value={selectedFile}
                  onChange={handleFileChange}
                  id="materi"
                />
              </div>
              <button className="mt-6 bg-blue-600 text-white px-3 py-2 rounded-2xl w-full">
                Submit
              </button>
            </form>
          </div>

          <section className=" w-[70%] p-6">
            <h1 className="justify-start text-3xl font-bold">Daftar Tugas</h1>
            <div className="mt-8 ">
              {data.map((item, index) => (
                <div key={index}>
                  <DaftarTugasDosenCard
                    index={index + 1}
                    judul={item.judul_tugas}
                    deadline={item.deadline}
                    editCard={() => isEdit(item.id, item.judul_tugas)}
                    deleteCard={() => isDelete(item.id)}
                  />
                </div>
              ))}
            </div>
            {/* edit form */}
            <div
              className={`bg-white p-5 fixed top-0  w-[70%] h-full flex items-center justify-center flex-col ${
                edit ? "block" : "hidden"
              }`}
            >
              <button onClick={() => setEdit(!edit)} className="absolute top-[80px] left-[20px] w-10 h-10 rounded-full bg-red-500 p-2 hover:bg-red-600 text-white">
                &#x2716;
              </button>
              <h1 className="text-3xl font-bold mt-4">
                Edit Tugas {formData.judul_tugas}
              </h1>
              <form
                className="mt-3 w-full text-[14px] gap-4"
                onSubmit={handleEdit}
                method="post"
              >
                <div className="mt-2 col-span-2">
                  <label className="block p-2" htmlFor="judul_tugas">
                    Judul
                  </label>
                  <input
                    className="outline-none border p-2 rounded-lg w-full"
                    type="text"
                    name="judul_tugas"
                    placeholder="ex: Ujian Tengah Semester "
                    value={formData.judul_tugas}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2 col-span-2">
                  <label className="block p-2" htmlFor="deadline">
                    Batas Pengumpulan
                  </label>
                  <input
                    className="outline-none border p-2 rounded-lg w-full"
                    type="text"
                    name="deadline"
                    placeholder="00:00 - 23:00 "
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2 col-span-2">
                  <label className="block p-2" htmlFor="instruksi">
                    Instruksi
                  </label>
                  <input
                    className="outline-none border p-2 rounded-lg w-full"
                    type="text"
                    name="instruksi"
                    placeholder="Instruksi"
                    value={formData.instruksi}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2 col-span-4 ">
                  <label className="block p-2" htmlFor="materi">
                    Materi
                  </label>
                  <input
                    className="h-[150px] outline-none border p-2 rounded-lg w-full"
                    type="file"
                    required
                    name="foto_sampul"
                    onChange={handleFileChange}
                    id="materi"
                  />
                </div>
                <button className="mt-6 bg-blue-600 text-white px-3 py-2 rounded-2xl w-full">
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </NavigationDosen>
    </>
  );
};

export default TugasDosenPage;
