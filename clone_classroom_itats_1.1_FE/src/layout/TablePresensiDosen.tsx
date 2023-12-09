import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import trash from '../../public/trash.svg'
import axios from 'axios';
import react, { useEffect, useState } from 'react';

// sx={{ minWidth: 650 }}
export default function BasicTable({index}) {

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const indexValue = index;
  const matkulId = Number(localStorage.getItem('matkul_id'))
  const mahasiswaID = Number(localStorage.getItem('id'))

  const handleDelete = async () => {

    try {
      const response = await axios.post('http://localhost:8000/api/delete_presensi',{matkul_id : matkulId, minggu : indexValue, mahasiswa_id : mahasiswaID});
      console.log(response.data);
      setIsFetching(true);
    } catch (error) {
      console.error('data kosong', error) 
    }
  }

  useEffect(() => {
    const getPresensi = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/get_mahasiswa_presensi',{matkul_id : matkulId, minggu : indexValue});
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('data kosong')
        
      }
    }
    getPresensi();
    setIsFetching(false);
  },[isFetching])
  // console.log(data);

  return (
    <TableContainer component={Paper} >
      <Table  aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Nama Mahasiswa</TableCell>
            <TableCell align="right">ID Mahasiswa</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.length > 0 ? (
  data.map((item, index) => (
    <TableRow
      key={index}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <TableCell component="th" scope="row">
        {item.namaMahasiswa}
      </TableCell>
      <TableCell align="right">{item.idMahasiswa}</TableCell>
      <TableCell align="right" className="flex justify-end">
        <div className='flex justify-end'>
          <button onClick={() => handleDelete(index)} className='bg-red-500 p-2 rounded-lg' >
            <Image src={trash} alt='trash' />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={3} align="center">
      Data kosong
    </TableCell>
  </TableRow>
)}

        </TableBody>
      </Table>
    </TableContainer>
  );
}