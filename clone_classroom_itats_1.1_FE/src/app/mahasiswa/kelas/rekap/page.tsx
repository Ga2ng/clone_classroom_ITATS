'use client';
import { useRouter } from 'next/navigation';
import NavigationLayout from '../../../../layout/NavigationLayout';
import AuthToken from '@/app/AuthToken';

const Rekap = () => {
  const token = AuthToken();
  const { push } = useRouter();
  token ? "" : push('/'); 


  return (
    <>
      <NavigationLayout>
        <div className="  container m-auto mb-[2000px] ">
            <div className="w-[70%]  m-auto">
              <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                Rekapitulasi Nilai
              </h1>

              <div className="my-8 justify-center" >
                <table className="border border-black m-auto">
                  <thead className="border border-black">
                    <tr className="border border-black">
                      <th className="pl-2 pr-16 border border-black" >No.</th>
                      <th className="pl-2 pr-24 border border-black" >Jenis</th>
                      <th className="pl-2 pr-36 border border-black" >Judul Tugas</th>
                      <th className="pl-2 pr-24 border border-black" >Nilai</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-center mt-8">
                  Tidak ada data
                </div>
              </div>
              
            </div>
          </div>
      </NavigationLayout>
    </>
  );
};

export default Rekap;
