import React from 'react'
import {Link} from 'react-router-dom'

const Login = (props) => {
    const redirect = () => {
        props.history.push('/auth/register')
      }

    return (<>
        <div>
            <h1>Login Page</h1>
            <form>
                <label htmlFor="username">User Name</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button>Login</button>
                <button onClick={redirect}>Register</button>
            </form>
        </div>
    </>)
}

export default Login;