import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../api";

const LoginForm = () => {
    //get set crudentials from form
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
          ...credentials,
          [name]: value,
        });
    };

    //make request login request to API
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Show spinner
        setError('');

        api.post('login', credentials).then((response) => {
            //store token in local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            //navigate to dashboard
            navigate('/home');
        }).catch((err) => {
            var errResponse = err.response;
            if(errResponse.status && errResponse.status == 403){
                setError("Invalid Login crudentials");
            }
            else {
                setError("An error occured, try again later");
            }
        }).finally(() => {
            //set loader to false after loading data
            setIsLoading(false);
        });
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="w-100 mx-auto mb-5">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Loading...
                        </>) : ('Login')
                    }
                </button>
            </form>
        </div>
    );
}

export default LoginForm;