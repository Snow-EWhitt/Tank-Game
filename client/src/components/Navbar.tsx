import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const auth = useAuth();

  const logout = () => {
    auth.removeUser();
    auth.signoutRedirect();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto">
            <Link to="/" className="text-reset text-decoration-none fs-5">
              Home
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/Online" className="text-reset text-decoration-none fs-5">
              Online
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/Local" className="text-reset text-decoration-none fs-5">
              Offline
            </Link>
          </div>
        </div>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
