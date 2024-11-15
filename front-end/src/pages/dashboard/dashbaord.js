import React from "react";
import NavBar from "../../components/partials/nav-bar";
import { LeadsForm, LeadsList } from "../../components/leads"

const DashboardPage = () => {
    const leadsListRef = React.useRef();

    return (
        <div>
            <NavBar/>
            <div className="container py-5">
                <h1>Dashboard</h1>
                <div className="row">
                    <div className="col-md-8">
                        <LeadsList ref={leadsListRef}/>
                    </div>
                    <div className="col-md-4">
                        <LeadsForm onLeadAdded={() => leadsListRef.current.fetchLeads()} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DashboardPage };