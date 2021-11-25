import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Unauthenticate = ({ component: Component, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies('user');

    return (
      <Route
        {...rest}
        render={props =>
            cookies.user ? (
                <Redirect to={{ pathname: '/all' }} />
          ) : (
               <Component {...props} />
          )
        }
      />
    )
  }
  export default Unauthenticate