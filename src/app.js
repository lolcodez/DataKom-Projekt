import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from "./components/test.js";

class App extends React.Component {
    render() {
        return (
            <HelloWorld />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
