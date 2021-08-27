
import React from "react";
import {LoginForm} from './react/pages/loginForm'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {NotFound} from './react/pages/NotFound'
function App() {
  return (
    <BrowserRouter>
     <>
     <Switch>
      <Route path="/" component={LoginForm} exact/>
      <Route path="*" component={NotFound}/>   
      </Switch> 
    </> 
    </BrowserRouter>     
    );
}

export default App;