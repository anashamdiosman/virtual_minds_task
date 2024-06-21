import { createContext, useEffect, useState } from "react";
import { instance as axios } from "../utils/AxiosInstance";
import Loader from "../components/loader/Loader";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/user/token",
          {},
          {
            withCredentials: true,
          }
        );

        setLoading(false);

        const accessToken = data?.user?.token;

        setAuth({ user: data?.user, accessToken });
      } catch (error) {
        setLoading(false);

        console.error("Error refreshing access token:", error);
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
