import React from "react";
import LoginForm from "../../components/login/login-form";

const LoginPage = () => {
    return (
        <div className="container py-5">
            <div className="row mt-5">
                <div class="col-md-4 offset-md-4 border p-4">
                    <h4 className="mb-3 mt-5">User Login</h4>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}

export { LoginPage };