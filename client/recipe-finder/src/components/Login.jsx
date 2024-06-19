import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    async function handleLogin() {
        try {
            const response = await axios.post('http://127.0.0.1:5000/token', {
                email: email,
                password: password
            });
            console.log(response.data.access_token);
            if(response.status === 200) {
                sessionStorage.setItem("token", response.data.access_token);
                navigate("/")
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setIsError(true);
        }
    }

    function logout() {
        sessionStorage.removeItem("token");
        setToken("");
    }

    return (
        <div className="d-flex vh-100">
            <div className="container align-self-center">
                {token === undefined || token === "" || token === null ? <>
                    <p className="display-4 text-center">Login</p>
                    <div className="d-flex justify-content-center">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button type="button" className="mt-3 btn btn-dark" onClick={handleLogin}>
                                    Login
                                </button>
                            </div>
                            {isError && <div className="mt-3 alert alert-danger" role="alert">
                                Error logging in... Please Try Again
                            </div> }
                        </form>
                    </div> </> :
                    <div className="text-center"><p className="display-4">You are already logged in</p>
                        <Link to={`/`}><button className="btn btn-dark">Go to Home Page</button></Link><br />
                        <button onClick = {logout} className="btn btn-outlined-dark mt-2">Click here to logout</button></div>
                }
            </div>
        </div>
    );
}
