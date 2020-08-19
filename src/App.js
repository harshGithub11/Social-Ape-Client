import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
//Components
import Navbar from './components/Navbar';

//Pages to be rendered at specific route 
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//importing theme object
import themeObject from './util/theme';

//importing JWT-Decode package for decoding token
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

//Redux 
import { Provider } from 'react-redux';
import store from './redux/store';

//Authentication Stuffs
import { SET_AUTHENTICATED } from './redux/types';
import { logOutUserAction, getUserDataAction } from './redux/actions/userAction';

import axios from 'axios';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  // console.log(token);
  // console.log(decodedToken);
  //This decoded token has a property(exp) that shows its expiring date in number form 
  //Now we will be doing "new Data(exp * 1000)" will give me the proper 
  //formated time when this token will expire
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logOutUserAction());
    window.location.href = "/login";
  }
  else { 
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserDataAction());
  }
}
const theme = createMuiTheme(themeObject);
function App() {
  return (
    <MuiThemeProvider theme = {theme}>
      <Provider store = {store} >
        <Router>
          <Navbar />
            <div className="container">
              <Switch>
                <Route exact path ="/" component={Home} />
                <AuthRoute exact path ="/login" component={Login} />
                <AuthRoute exact path ="/signup" component={SignUp} />
              </Switch>
            </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
