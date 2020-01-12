import * as React from "react";
import styled from "styled-components";

export default function Dashboard() {
    return (
        <DashboardContainer>
            <h1>
                <a href="https://codeselfstudy.com/" target="_blank">
                    Code Self Study
                </a>
            </h1>
            <ul>
                <li>
                    <a
                        title="Share this page in the forum"
                        href="#"
                        id="shareLink"
                    >
                        Share Current Page
                    </a>
                </li>
                <li>
                    <a href="https://forum.codeselfstudy.com/" target="_blank">
                        Coding Forum
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.meetup.com/codeselfstudy"
                        target="_blank"
                    >
                        SF Bay Meetups
                    </a>
                </li>
                <li>
                    <a href="https://codeselfstudy.slack.com/" target="_blank">
                        Programming Chatroom
                    </a>
                </li>
                <li>
                    <a href="#" id="codesLink">
                        WiFi &amp; Bathroom Codes
                    </a>
                </li>
            </ul>
            <div id="codesOutput"></div>
        </DashboardContainer>
    );
}

const DashboardContainer = styled("div")``;

// const Display = styled("div")`
//     font-size: 48px;
// `;
