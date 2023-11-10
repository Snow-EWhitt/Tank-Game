import { useNavigate } from "react-router-dom";

export const StartGame = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle">
        <button className="btn btn-success"
          onClick={() => navigate("/Game")}>
          Start Game
        </button>
      </div>
    </div>
  );
};
