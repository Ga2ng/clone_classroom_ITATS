'use client';
import Image from "next/image";
import avatar from "../../../../../public/avatar.svg"
import wa from "../../../../../public/wa.svg";
import CardMahasiswa from "@/components/CardMahasiswa";
import NavigationLayout from "@/layout/NavigationLayout";
import AuthToken from "@/app/AuthToken";
import { useRouter } from "next/navigation";

const DaftarMahasiswa = () => {
  const token = AuthToken();
  const { push } = useRouter();
  token ? "" : push('/'); 


  const data = Array(18).fill({
    text: "Minggu ke - 1",
    status: "Presensi [M] Closed",
  });

  return (
    <>
      <NavigationLayout>
        <div className="  container m-auto">
          <div className="px-[50px] ">
            <div className="w-[70%]  m-auto">
              <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                Dosen
              </h1>
              {/* dosen */}
              <div className="flex gap-6 my-8" >
                <div className="flex items-center" >
                  <div className=' w-10 h-10 flex  items-center  '>
                    <Image src={avatar} alt='avatar' />
                  </div>
                </div>
                <div className="flex" >
                  <div className="pr-4 ">
                    <h2 className="text-[#4723D9]" >Aku Sendiri</h2>
                    <p>11223344</p>
                  </div>
                  <div className="w-[20px] flex items-center "  >
                    <Image src={wa} alt="wa" />
                  </div>
                </div>
              </div>

              <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                Mahasiswa (39)
              </h1>

              {/* absensi */}
              <div className="flex mt-2 flex-col gap-6  ">

                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
                <CardMahasiswa/>
              </div>
            </div>
          </div>
        </div>
      </NavigationLayout>
    </>
  );
};

export default DaftarMahasiswa;
