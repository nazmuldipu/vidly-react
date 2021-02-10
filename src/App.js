import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Customers from './components/customer';
import LoginForm from './components/loginForm';
import MovieForms from './components/movieForm';
import Movies from './components/movies';
import NavBar from './components/navBar';
import NotFound from './components/notFound';
import RegisterForm from './components/registerForm';
import Rentals from './components/rentals';


function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForms} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
