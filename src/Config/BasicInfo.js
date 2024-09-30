import Logo from "./../Images/logo.png";
// import LogoIcon from "./../Images/loginFrontImage.png";
import { toast } from "react-toastify";
export const BasicInfo = {
  logo: Logo,
  // logoIcon: LogoIcon,
  projectName: "Meta F",
  isDebug: false,
};
export const toastSuccess = (msg) => toast.success(msg);
export const toastFailed = (msg) => toast.error(msg);
