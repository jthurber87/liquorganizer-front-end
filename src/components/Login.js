import React from 'react'

const Login = () => {
    return (<>
        <div>
            <h1>Login Page</h1>
            <form>

                <label htmlFor="username">User Name</label>

                <input type="text" name="username" id="username" />


                <label htmlFor="password">Password</label>

                <input type="password" name="password" id="password" />
                <input type="submit" value="Login" />

            </form>
        </div>
    </>)
}

export default Login;