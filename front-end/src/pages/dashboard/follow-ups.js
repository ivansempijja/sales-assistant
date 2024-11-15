import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/partials/nav-bar";
import ScheduleFollowUp from "../../components/follow_ups/schedule-follow-up";
import FollowUpList from "../../components/follow_ups/follow-up-list";
import api from "../../api";

const FollowUps = () => {
    const { leadId } = useParams();
    const [lead, setLead] = useState(null);

    const fetchLeadDetails = async () => {
        api.get(`leads/${leadId}`).then((response) => {
            setLead(response.data.data);
        }).catch((error) => {
            console.error('Error fetching lead details:', error);
        });
    }

    useEffect(() => {
        fetchLeadDetails();
    }, [leadId]);

    if (!lead) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar/>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 px-4">
                        <h5>Lead</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phone}</td>
                                </tr>
                            </thead>    
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <FollowUpList followups={lead.follow_ups} onUpdateStatus={fetchLeadDetails}/>
                    </div>
                    <div className="col-md-4">
                        <ScheduleFollowUp leadId={leadId} refreshLead={fetchLeadDetails}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowUps;