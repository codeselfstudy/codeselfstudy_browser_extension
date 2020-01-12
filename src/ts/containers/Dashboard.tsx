import * as React from "react";
import styled from "styled-components";

export default function Dashboard() {
    return (
        <DashboardContainer>
            <Display>Dashboard</Display>
        </DashboardContainer>
    );
}

const DashboardContainer = styled("div")`
    color: teal;
`;

const Display = styled("div")`
    font-size: 48px;
`;
