import { Link, NavLink, useHistory } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootStore } from "../Store";
import Search from "./Search";

function Navbar() {
  let userLocal;
  let userL;
  try {
    userLocal = JSON.parse(localStorage.getItem("_user") || "");
  } catch (error) {
    userLocal = undefined;
  }
  userL = userLocal ? userLocal.user : undefined;

  const userState = useSelector((state: RootStore) => state.user);

  const { user } = userState;
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("_user");
    user.token = "";
    history.push("/login");
  };

  return (
    <div className="navbar">
      <div>
        <div className="brand">
          <NavLink to="/">
            <h1>Blog Post</h1>
          </NavLink>
        </div>
        <Search />
        <div>
          {userL ? (
            <div className="login-signup">
              <Link to="/profile">
                <AiOutlineUser color="default" size={30} />
              </Link>
              <AiOutlineLogout size={30} onClick={logout} />
            </div>
          ) : (
            <div className="login-signup">
              <Link to="/login">
                <button className="btn-primary">Log In</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
