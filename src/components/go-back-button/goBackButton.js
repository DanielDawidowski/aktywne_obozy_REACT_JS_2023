import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const GoBackButton = () => {
  const navigate = useNavigate();

  return <BsFillArrowLeftSquareFill style={{ fill: "#f3722c" }} onClick={() => navigate(-1)} />;
};
