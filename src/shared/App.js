import React from "react";
import routes from "./routes";
import { Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <>
      <Switch>
        {routes.map(({ path, exact, component }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </Switch>
    </>
  );
}
// import React from 'react'
// import {Route} from 'react-router-dom'
// import Home from './home'
// import Blog from './blog'
// import Login from './login'
// import Contact from './contact'
// import Schedule from './schedule'
// import About from './about'

// const App=()=>{
// return(
//   <Route path="/" exact component={Home}/>
//   <Route path="/blog" exact component={Blog}/>
//   <Route path="/login" exact component={Login}/>
//   <Route path="/contact" exact component={Contact}/>
//   <Route path="/about" exact component={About}/>
//   <Route path="/schedule" exact component={Schedule}/>
// )
// }
// export default App
