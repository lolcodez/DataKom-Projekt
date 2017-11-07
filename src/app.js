var React      = require('react');
var ReactDOM   = require('react-dom');
var HelloWorld = require('./components/test.js');

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
