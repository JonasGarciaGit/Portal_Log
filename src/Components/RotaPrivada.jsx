import React from 'react'
import {Route, Redirect} from 'react-router'

const PrivateRoute = props  =>{
    const estaLogado = !!sessionStorage.getItem('userToken')
    return estaLogado ? <Route {...props}/> : <Redirect to="/portallogs" />
}


export default PrivateRoute;