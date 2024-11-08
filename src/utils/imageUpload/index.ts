import axios from "axios";

const CLIENT_API_KEY = "82695f3408d0e2b09213a53ef8f1481c";

export const ImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
      formData
    );
    if (res.data.success) {
      return res.data.data.url;
    }
  } catch (err) {
    console.log(err);
  }
};
