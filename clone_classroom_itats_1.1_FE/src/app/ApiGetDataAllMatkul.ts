import axios from 'axios';

async function getDataFromApiMatkul(): Promise<any> {
  try {
    const response = await axios.get('http://localhost:8000/api/matkul'); // Sesuaikan dengan URL endpoint API Anda
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default getDataFromApiMatkul;