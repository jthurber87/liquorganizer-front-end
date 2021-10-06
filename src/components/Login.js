import React from 'react'

const Login = () => {
    return(
        <div>
            <form>
                <label htmlFor="username">User Name</label>
                <input type="text" name="username" id="username">User ID</input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"></input>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;