import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "./components/User";
import { setUser } from "./store/session";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/index";
import UsersList from "./components/UsersList";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DrawingPageContainer from "./components/DrawingPageContainer";
import ProfilePageContainer from "./components/ProfilePageContainer";
import CreatePageContainer from "./components/CreatePageContainer";
import HomePageContainer from "./components/HomePageContainer";
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const sessionUser = await authenticate();
      if (!sessionUser.errors) {
        dispatch(setUser(sessionUser));
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar setAuthenticated={setAuthenticated} authenticated={authenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/drawings/:drawingId" exact={true} authenticated={authenticated}>
          <DrawingPageContainer />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:username" exact={true} authenticated={authenticated}>
          <ProfilePageContainer />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <HomePageContainer />
        </ProtectedRoute>
        <ProtectedRoute path="/create" exact={true} authenticated={authenticated}>
          <CreatePageContainer />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
