import React, { Component } from 'react';
import {Tab, Tabs} from "react-bootstrap";

import StatusDashboard from "./StatusDashboard/StatusDashboard";

class TabView extends Component {
    render() {
        return (
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Products">
                    <StatusDashboard/>
                </Tab>
            </Tabs>
        )
    }
}

export default TabView;
