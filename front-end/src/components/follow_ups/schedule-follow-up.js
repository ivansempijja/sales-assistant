import React, { useState } from "react";
import api from "../../api";
import { toast } from 'react-toastify';

const ScheduleFollowUp = ({ leadId, refreshLead }) => {
    const [scheduledAt, setScheduledAt] = useState('');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFieldErrors({});
        setIsLoading(true);
        setError(null);

        var data = {'scheduled_at' : scheduledAt, 'lead_id' : leadId};
        api.post('followups', data).then((response) => {
            refreshLead();
            toast.success("Follow up has been scheduled");
            setScheduledAt('')
        }).catch((error) => {
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
        })
    }

    return (
        <div className="container py-5">
            <h5 className="mb-3">Schedule Follow up</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="w-100 mx-auto">
                <div className="form-group mb-3">
                    <label htmlFor="scheduled_at">Scheduled At</label>
                    <input
                        type="date"
                        id="scheduled_at"
                        name="scheduled_at"
                        className={`form-control ${fieldErrors.scheduled_at ? 'is-invalid' : ''}`}
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        //required
                    />
                    {fieldErrors.scheduled_at && <div className="text-danger">{fieldErrors.scheduled_at[0]}</div>}
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

export default ScheduleFollowUp;