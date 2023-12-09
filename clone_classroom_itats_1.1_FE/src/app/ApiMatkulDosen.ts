import axios from "axios";

export async function FetchMatkulDosen () {
  try {
    const userId = {
      dosen_id: localStorage.getItem("id"),
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/get_matkul_dosen",
      userId
    );
    console.log(response.data);
    return response.data;
    // Lakukan sesuatu dengan respons di sini
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};