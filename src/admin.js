import React from "react";
import ReactDOM from "react-dom";
import Header from "./admin/header"
import Body from "./admin/body"

class Admin extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
            </div>
        );
    }
}

ReactDOM.render(
    <Admin />,
    document.getElementById('root')
);
