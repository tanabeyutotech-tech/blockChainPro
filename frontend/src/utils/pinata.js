import axios from "axios";

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

if (!PINATA_JWT) {
  console.error("VITE_PINATA_JWT missing");
}

export const uploadFileToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
};

export const uploadJSONToPinata = async (metadata) => {
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    metadata,
    {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "application/json",
      },
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
};