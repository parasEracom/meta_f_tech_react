import axios from "axios";
import getSignature from "./getSignature";
import { BasicInfo, toastFailed } from "./../Config/BasicInfo";
import { setLoginDisplay } from "./../Redux/LoginSlice";
import { useDispatch } from "react-redux";
const baseURL = process.env.REACT_APP_API_URL;

const useAxiosHelper = () => {
  const dispatch = useDispatch();
  const AxiosGet = async (endPoint, body) => {
    const headers = await getSignature();
    try {
      const response = await axios.get(`${baseURL}${endPoint}`, { headers });
      BasicInfo.isDebug && console.log(`${endPoint} = `, response);
      return response.data;
    } catch (error) {
      BasicInfo.isDebug && console.log(`${endPoint} = `, error);
      if (error?.response?.data?.code === 419) {
        // toastFailed(error?.response?.data?.message);
        dispatch(setLoginDisplay(true));
      }
    }
  };

  const AxiosPost = async (endPoint, body) => {
    BasicInfo.isDebug && console.log("endPoint", baseURL);
    const headers = await getSignature();
    try {
      const response = await axios.post(`${baseURL}${endPoint}`, body, {
        headers,
      });
      BasicInfo.isDebug && console.log("response", response);
      BasicInfo.isDebug && console.log(`${endPoint} = `, response);
      return response.data;
    } catch (error) {
      BasicInfo.isDebug && console.log(`${endPoint} = `, error);
      if (error?.response?.data?.code === 419) {
        toastFailed(error?.response?.data?.message);
        dispatch(setLoginDisplay(true));
      }
      throw error;
    }
  };

  return { AxiosGet, AxiosPost };
};

export default useAxiosHelper;
