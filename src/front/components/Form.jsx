import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Form = () => {

    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e) {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/login', requestOptions)
            .then(response => {
                console.log(response.status)
                if(response.status == 200){
                    dispatch({ type: "set_auth", payload: true })
                }
                return response.json()
            })
            .then(data => {
                localStorage.SetItem("token", data.access_token);
                console.log(data)
            });
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword" placeholder="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Form;