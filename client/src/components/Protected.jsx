import { Navigate } from "react-router-dom";

export default function Protected(props) {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}
