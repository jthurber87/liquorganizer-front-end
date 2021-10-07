import {useState} from 'react';

function Register(props) {
    const [input, setInput] = useState({
        username:'',
        password:''
    })

    const createAccount = async (user) => {
        try {
            const configs = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
            const creatUser = await fetch('https://liquorganizer-back-end.herokuapp.com/auth/register', configs)
            const parsedUser = await creatUser.json()
            console.log(parsedUser)
            props.history.push('/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        createAccount(input)
    }

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input type="text" name="username" id="username" value={input.username} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={input.password} onChange={handleChange}/>
                <button onClick={()=>{props.history.push('/auth/login')}}>Create Account</button>
            </form>
        </div>
    )
}

export default Register;
