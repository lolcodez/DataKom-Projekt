'use strict';

import * as React from "react";
import * as ReactDOM from "react-dom";

import * as WebSocket from "ws";

import { Calendar } from "./components/Calendar.jsx";

class App extends React.Component {
    render() {
        return (
            <Calendar date={new Date(Date.now())} />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);