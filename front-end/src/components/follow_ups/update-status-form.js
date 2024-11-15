import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../api";

const UpdateStatusForm = ({ show, handleClose, followupId, onSubmit }) => {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = followupId.id

        api.put(`followups/${id}/status`, {'status': status}).then((response) => {
            toast.success("Status has been updated");
        }).catch((error) => {
            toast.error("An error occured will updating status");
        });
        onSubmit(followupId, status);
        
        handleClose(); 
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Follow-Up Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Missed">Missed</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="mt-3 text-end mb-5">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateStatusForm;
