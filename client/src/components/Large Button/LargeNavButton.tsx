import { FC } from 'react'
import { useNavigate } from "react-router-dom";

export const LargeNavButton: FC<{
  text: string,
  route: string,
}> = ({ text, route }) => {
  const navigate = useNavigate();

  return (
    <div
          className="btn btn-success d-flex justify-content-center align-items-center"
          style={{ width: "300px", height: "150px" }}
          onClick={() => navigate(route)}
        >
          <p className="fs-1 fw-bold">{text}</p>
        </div>
  )
}
