import axios from "axios";

export async function FetchMatkul () {
  try {
    const userId = {
      mahasiswa_id: localStorage.getItem("id"),
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/get_matkul_by_id",
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