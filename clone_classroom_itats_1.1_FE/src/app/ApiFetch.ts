import axios from 'axios';

export async function FetchData() {
  try{
    const response = await axios.get('http://127.0.0.1:8000/api/mahasiswa');
    return response.data;
  } catch (error) {
    throw error;
  }
}