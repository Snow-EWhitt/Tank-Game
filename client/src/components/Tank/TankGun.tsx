import Constants from "../../Constants";

export const TankGun = () => {
  return (
    <div
      className="bg-success bg-gradient border rounded-circle"
      style={{
        width: `${Constants.tankWidth}px`,
        height: `${Constants.tankWidth}px`,
      }}
    >
      <div
        className="bg-success bg-gradient border position-absolute bottom-100"
        style={{
          height: `${Constants.tankHeight * 0.75}px`,
          width: `${Constants.tankWidth * 0.2}px`,
          left: `${
            Constants.tankWidth / 2 - (Constants.tankWidth * 0.2) / 2
          }px`,
        }}
      />
    </div>
  );
};
