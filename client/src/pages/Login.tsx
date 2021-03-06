import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { UserLogin } from "../actions/UserActions";
import { RootStore } from "../Store";

function Login(props: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);

  const { user } = userState;

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(UserLogin(email, password));
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  if (user.token !== "") {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <div className="brand">
        <Link to="/">
          <h1 className="icon-brand">Blog Post</h1>
        </Link>
      </div>

      <div className="login">
        <h1>Login</h1>
        <div className="login-fields">
          <label>
            Email <br />
            <input type="email" required value={email} onChange={handleEmail} />
          </label>
          <label>
            Password <br />
            <input
              type="password"
              required
              value={password}
              onChange={handlePassword}
            />
          </label>
          <button onClick={handleSubmit} className="btn-primary">
            Login
          </button>
        </div>
        <br />
        <Link to="/signup">Don't have account yet ? Singup Here...</Link>
      </div>
    </div>
  );
}

export default Login;
