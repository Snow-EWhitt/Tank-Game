import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto">
            <Link to="/" className="text-reset text-decoration-none fs-5">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
