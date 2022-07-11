import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SingleQuestion from './components/singleQuestionDisplay/questions';
import { authenticate } from './store/session';
import { getQuestionsThunk } from './store/questions'
import { getAnswersThunk } from './store/answers'
import { getAllUsersThunk } from "./store/users";
import CreateQuestion from './components/createQuestion/createQuestion';
import EditQuestion from './components/editQuestion/editQuestion';
import Home from './components/home/home';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getQuestionsThunk())
      await dispatch(getAnswersThunk())
      await dispatch(getAllUsersThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/' exact={true} >
          <Home />
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/questions/new" exact={true}>
          <CreateQuestion />
        </ProtectedRoute>
        <Route exact path="/questions/:id">
          <SingleQuestion />
        </Route>
        <ProtectedRoute exact path="/questions/:id/edit">
          <EditQuestion />
        </ProtectedRoute>
        <ProtectedRoute>
          <h1 id='notfound'>Page Not Found</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
