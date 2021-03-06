import { Switch, Route, withRouter } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Blog from "./pages/Blog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const App = withRouter(({ location }) => {
  return (
    <div className="app">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <header>
          <Navbar />
        </header>
      )}
      <main>
        <div className="container">
          <div className="main-content">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/blogs/:id" component={Blog} />
              <PrivateRoute exact path="/blogs/edit/:id" component={EditBlog} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
          {location.pathname !== "/login" && location.pathname !== "/signup" && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

export default App;
