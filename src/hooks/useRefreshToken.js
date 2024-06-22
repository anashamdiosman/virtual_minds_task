import { instance as axios } from "../utils/AxiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/user/token",
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      setAuth((prev) => {
        return { ...prev, accessToken: response?.data?.user?.token };
      });
      return response?.data?.user?.token;
    } catch (error) {
      setAuth({});
    }
  };
  return refresh;
};

export default useRefreshToken;
