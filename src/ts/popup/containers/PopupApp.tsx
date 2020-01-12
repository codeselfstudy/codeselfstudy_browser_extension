import * as React from "react";
import styled from "styled-components";
import Dashboard from "../../containers/Dashboard";

export default function PopupApp() {
    return (
        <>
            <PopupAppContainer>
                <Dashboard />
            </PopupAppContainer>
        </>
    );
}

const PopupAppContainer = styled("div")`

`;
