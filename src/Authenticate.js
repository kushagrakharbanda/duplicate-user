import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Authenticate = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies('user');

    return (
      <Route
        {...rest}
        render={props =>
            cookies.user ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }
  export default Authenticate