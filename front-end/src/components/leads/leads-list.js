import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import api from "../../api";
import { Link } from 'react-router-dom';

const LeadsList = forwardRef((props, ref) => {
    const [leads, setLeads] = useState([]);
    const [error, setError] = useState(null);

    const fetchLeads = async () => {
        setError(null);

        await api.get('leads').then((response) => {
            setLeads(response.data.data);
        }).catch((error) => {
            setError("An error occured while fetching data");
        })
    }

    useEffect(() => {
        fetchLeads();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchLeads
    }));

    return (
        <div className="container py-5">
            <h5 className="mb-3">Leads</h5>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>
                                <Link to={`/leads/${lead.id}`} className="btn btn-info">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
})

export default LeadsList;