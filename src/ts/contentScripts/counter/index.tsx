import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import DashboardApp from "./containers/DashboardApp";

import { createDomAnchor } from "../../scripts/dom";

createDomAnchor("dashboard-root");
const store = new Store();

store.ready().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <DashboardApp />
        </Provider>,
        document.getElementById("dashboard-root")
    );
});
