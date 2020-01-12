import * as React from "react";
import styled from "styled-components";
import Dashboard from "../../../containers/Dashboard";

export default function DashboardApp() {
    return (
        <>
            <DashboardAppContainer>
                <Dashboard />
            </DashboardAppContainer>
        </>
    );
}

const DashboardAppContainer = styled("div")`
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
    background-color: ${p => p.theme.backgroundColor};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
