import { LargeNavButton } from "../../components/Large Button/LargeNavButton";

export const GameMode = () => {
  return (
    <div className="container">
      <div
        className="d-flex justify-content-around align-items-center"
        style={{ height: "calc(100vh - 46px)" }}
      >
        <LargeNavButton text="Local Game" color="primary" route="/Local" />
        <LargeNavButton text="Online Game" route="/Online" />
      </div>
    </div>
  );
};
