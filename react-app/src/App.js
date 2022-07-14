import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SingleQuestion from './components/singleQuestionDisplay/questions';
import { authenticate } from './store/session';
import { getQuestionsThunk } from './store/questions'
import { getAnswersThunk } from './store/answers'
import { getAllUsersThunk } from "./store/users";
import CreateQuestion from './components/createQuestion/createQuestion';
import EditQuestion from './components/editQuestion/editQuestion';
import Home from './components/home/home';
import LandingPage from './components/landingPage/landingPage';
import NavBar from './components/NavBar';

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
      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <ProtectedRoute path='/questions' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/questions/new" exact={true}>
          <CreateQuestion />
        </ProtectedRoute>
        <ProtectedRoute exact path="/questions/:id">
          <SingleQuestion />
        </ProtectedRoute>
        <ProtectedRoute exact path="/questions/:id/edit">
          <EditQuestion />
        </ProtectedRoute>
        <ProtectedRoute>
          <NavBar />
          <h1 id='notfound' className='logo'>Page Not Found</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
