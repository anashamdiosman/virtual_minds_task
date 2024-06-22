import { privateInstance } from "../utils/AxiosInstance";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateInstance.interceptors.request.eject(requestIntercept);
      privateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return privateInstance;
};

export default useAxiosPrivate;
