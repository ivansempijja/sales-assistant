import React, { useState } from "react";
import api from "../../api";
import { toast } from 'react-toastify';

const LeadsForm = ({ onLeadAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFieldErrors({});
        setIsLoading(true);
        setError(null);

        var data = {name, email, phone};
        api.post('leads', data).then((resposne) => {
            toast.success("Lead has been added");
            setName('');
            setEmail('');
            setPhone('');

            //refresh leads table
            if (onLeadAdded) {
                onLeadAdded();
            }
            
        }).catch((error) => {
            //handle 422 error when laravel validation fails
            var errResponse = error.response;
            if(errResponse && errResponse.data && errResponse.data.errors){
                setFieldErrors(errResponse.data.errors);
                setError("Invalid form data");
            }
            else {
                setError("An error occured, try again later");
            }

        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="container py-5">
            <h5 className="mb-3">Add New Lead</h5>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
            <form onSubmit={handleSubmit} className="w-100 mx-auto">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        //required
                    />
                    {fieldErrors.name && <div className="text-danger">{fieldErrors.name[0]}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        //required
                    />
                    {fieldErrors.email && <div className="text-danger">{fieldErrors.email[0]}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className={`form-control ${fieldErrors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        //required
                    />
                    {fieldErrors.phone && <div className="text-danger">{fieldErrors.phone[0]}</div>}
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
                        </>) : ('Save Lead')
                    }
                </button>
            </form>
        </div>
    );
}

export default LeadsForm;