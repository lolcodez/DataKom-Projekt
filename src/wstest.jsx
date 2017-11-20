'use strict';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Calendar } from "./components/Calendar.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        
        const date = new Date(Date.now());
        
        this.state = {
            date: date,
            startOfWeek: undefined
        };
    }
    
    render() {
        return (
            <div>
                <Calendar year={ this.state.date.getFullYear() }
                          month={ this.state.date.getMonth()+1 }
                          startOfWeek={this.state.startOfWeek} />
                <form onSubmit={ this.submitted.bind(this) }>
                    <input type="text" defaultValue="Monday" />
                    <input type="submit" />
                </form>
            </div>
        );
    }

    submitted(event) {
        event.preventDefault();
        this.setState({
            date: this.state.date,
            startOfWeek: event.target.children[0].value
        });
    }
}

const app = <App />;

ReactDOM.render(
    app,
    document.getElementById('root')
);

const ws = new WebSocket(`ws://${ window.location.host }/ws`);

ws.onmessage = (msg) => {
    console.log(msg);
};

window.appComponent = app;
