import React, { useState } from "react";
import UpdateStatusForm from "./update-status-form";
import { Modal } from 'react-bootstrap';

const FollowUpList = ({ followups, onUpdateStatus }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user.role;
    const canUpdateStatus = userRole === 'Admin' || userRole === 'Sales Manager';

    const [showModal, setShowModal] = useState(false);
    const [selectedFollowUpId, setSelectedFollowUpId] = useState(null);

    const handleOpenModal = (id) => {
        setSelectedFollowUpId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFollowUpId(null);
    };

    return (
        <div className="container py-5">
            <h5 className="mb-3">Follow up List</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Scheduled At</th>
                        <th>Status</th>
                        {canUpdateStatus && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {followups.map((followup) => (
                        <tr key={followup.id}>
                            <td>{followup.scheduled_at}</td>
                            <td>{followup.status}</td>
                            {canUpdateStatus && (
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleOpenModal(followup)}
                                    >
                                        Update Status
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>



            {showModal && (
                <UpdateStatusForm
                    show={showModal}
                    handleClose={handleCloseModal}
                    followupId={selectedFollowUpId}
                    onSubmit={onUpdateStatus}
                />
            )}
        </div>
    );
}

export default FollowUpList;