import React from "react";
import routes from './routes'
import {Route} from 'react-router-dom'
export default function App() {
  return (
    <>
    {routes.map(({path,exact,component})=><Route key={path} path ={path} exact={exact} component={component}/>)}
    </>
  );
}
