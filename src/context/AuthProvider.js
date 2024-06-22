import { createContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

import { instance as axios } from "../utils/AxiosInstance";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          return {
            user: response?.data?.user,
            accessToken: response?.data?.user?.token,
          };
        });
        setLoading(false);
      } catch (error) {
        setAuth({});
        setLoading(false);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
