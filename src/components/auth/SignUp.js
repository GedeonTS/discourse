// import { updateCurrentUser } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUp =()=>{
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError ] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const signUp = (e) =>{
        e.preventDefault();
        if(password !== passwordConfirm){
            setError("passwords don't match")
            setEmail("")
            setPassword("")
            setPasswordConfirm("")
        }else{
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/")
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setLoading(false)
    }
    
    return (
        <div className="log-container">
            <h1 className="log-header">Create an Account: sign up page</h1>
            {error && <p>{error}</p>}
            <form onSubmit={signUp}>
                <p>
                    please make sure to use a valid university or college email
                </p>
                <input
                    required
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    Sign Up
                </button>
            </form>

            <div>
                <h3 className="log-header2">
                    Already have an account?
                    <Link to="/login">Log in</Link>
                </h3>
            </div>
        </div>
    );
}

export default SignUp