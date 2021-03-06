import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserRegister } from "../actions/UserActions";
import { RootStore } from "../Store";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<any>("");

  const dispatch = useDispatch();
  const userState = useSelector((state: RootStore) => state.user);

  const { message } = userState;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files && event.target.files[0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("profilePicture", image);

    dispatch(UserRegister(data));
  };

  return (
    <div>
      <div className="brand">
        <Link to="/">
          <h1 className="icon-brand">Blog Post</h1>
        </Link>
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="signup">
          {message && <h5>{message}</h5>}
          <h1>Sign Up</h1>
          <label>
            Name <br />
            <input
              type="name"
              required
              onChange={handleNameChange}
              value={name}
            />
          </label>
          <label>
            Email <br />
            <input
              type="email"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </label>

          <label>
            Password <br />
            <input
              type="password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
          </label>
          <label>
            Profile Picture <br />
            <input
              type="file"
              required
              name="profilePicture"
              accept=".png, .jpg"
              onChange={handleFileChange}
            />
          </label>

          <button type="submit" className="btn-primary">
            SignUp
          </button>
          <br />
          <Link to="/login">Already have account ? Log In here..</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
