import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "https://expressjsshopping-kh3k.onrender.com/api/";
const TOKEN = Cookies.get("userInfo");
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const TokenRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
