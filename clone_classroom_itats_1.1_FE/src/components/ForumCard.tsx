import React from "react";
import avatar from "../../public/avatar.svg"
import plane from "../../public/plane_black.svg";
import Image from "next/image";

const ForumCard = ({judul}) => {
  return (
    <div>
      <div className="mt-8 ">
        <header className="border p-6 rounded-t-xl">
          <div className="flex">
            <div className="w-[45px]">
              <Image src={avatar} alt="avatar"></Image>
            </div>
            <div className="pl-4">
              <h1>Kucing Gemuk</h1>
              <p className="text-[12px]">10 Oktober 2023 13:54</p>
            </div>
          </div>
          <h1 className="pt-5 pb-8">Materi Minggu ke 3</h1>
        </header>
        <main className="border p-6">
          <h1 className="text-xl">Materi :</h1>
          <p className="pt-8 pl-6">{judul}</p>
          <div className="pt-4 pl-6 w-15">
            <button className="bg-info px-4 py-2 rounded-xl">Lihat Materi</button>
          </div>
        </main>
        <footer className="flex p-6 border rounded-b-xl">
          <div className="w-[45px] flex items-center">
            <Image src={avatar} alt="avatar"></Image>
          </div>
          {/* <input type="text" placeholder="Tambahkan komentar kelas.." className="input input-bordered w-full ml-4" /> */}
          <input
            type="text"
            placeholder="Tambahkan komentar kelas..."
            className="w-full p-2 h-[45px] ml-4 focus:border-none border"
          />
          <button className="bg-slate-400 py-4 px-8 h-[45px] flex items-center rounded-r-xl">
            <Image src={plane} alt="plane" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ForumCard;
