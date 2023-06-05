import { ThreeCircles } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="yellow"
        innerCircleColor="black"
        middleCircleColor="yellow"
      />
    </div>
  );
};
