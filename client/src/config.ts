const DEV_API_URL = "http://localhost:3001/api";

const PROD_API_URL = "https://weatherapp-j0yb.onrender.com/api";

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;
