import axios from "axios";

const fetcher = async <T>(url: string): Promise<T | null> =>
  axios.get<T>(url, { withCredentials: true }).then((res) => res.data);
export default fetcher;
