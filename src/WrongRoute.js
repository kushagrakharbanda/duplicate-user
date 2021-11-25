import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useCookies} from 'react-cookie'

const WrongRoute = ({ component: Component, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies('user');

    return (
      <Route
        {...rest}
        render={props =>
            cookies.user ? (
                <Redirect to={{ pathname: '/all', state: { from: props.location } }} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }
  export default WrongRoute