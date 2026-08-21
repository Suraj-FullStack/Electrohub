import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        // Example login user
        // Later, replace this with your actual API response
        const user = {
            username: username,
            accesstoken: "fasdfsadfasdf",
            refreshtoken: "asdfasdfsfd"
        }

        // Save logged-in user in localStorage
        localStorage.setItem("user", JSON.stringify(user))

        // Redirect to protected profile page
        navigate("/profile")
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login