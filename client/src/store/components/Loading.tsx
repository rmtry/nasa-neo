import { useSelector } from "react-redux";
import { getIsAppLoading } from "../selectors/app-settings-selectors";

const Loading = () => {
  const isLoading = useSelector(getIsAppLoading);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        display: isLoading ? "flex" : "none",
      }}
    >
      <p style={{ color: "black" }}>Loading... (longer date might take more time)</p>
    </div>
  );
};

export default Loading;
