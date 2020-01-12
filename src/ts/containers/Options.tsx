import * as React from "react";
import styled from "styled-components";

// TODO the options aren't showing on the extensions page.
export default function Options() {
    return (
        <OptionsContainer>
            <Display>hello world</Display>
        </OptionsContainer>
    );
}

const OptionsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 100px;
    padding: 5px;
    margin: 5px;
    background-color: ${p => p.theme.backgroundColor};
`;

const Display = styled("div")`
    font-size: 48px;
    justify-self: center;
`;
