import React from 'react'; // if: import React, { Component } from 'react';
import './Layout.css';     // then just writes Component and not React.Component


// ******************* EXPORT COMPONENT *******************
export default class Layout extends React.Component {
    render() { // return of render is the 1 div that is in "root"
        return (
            <div>
                <Header />
                <UserForms />
            </div>
        );
    }
}

// ******************* OTHER COMPONENTS *******************
class Header extends React.Component {
    render() {
        return(
            <div>
                <h1> Welcome to Snerikes Table Booking! <br /> </h1>
            </div>
        );
    }
}

// *******************
class UserForms extends React.Component {
    constructor() {
        super();
        this.state = {
            amountGuests: 1,  // initially set to 1 person
            date: '',         //TODO
            time: '18.00',         //TODO
            name: '',
            email: ''
        };
    }
    changeAmount(newAmount) {
        this.setState({amountGuests: newAmount});
    }
    changeTime(newTime) {
        this.setState({time: newTime});
    }
    changeName(newName) {
        this.setState({name: newName});
    }
    changeEmail(newEmail) {
        this.setState({email: newEmail});
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <p> Begin by entering how many people you are and then choose an available date</p>
                <SubmitForm changeAmount={this.changeAmount.bind(this)} />
                <p> Currently showing available dates for {this.state.amountGuests} guests </p>
                <Calendar />
                <MiscForms changeTime={this.changeTime.bind(this)} changeName={this.changeName.bind(this)} changeEmail={this.changeEmail.bind(this)} />
            </div>
        );
    }
}

// *******************
class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit(e) {
    this.props.changeAmount(this.state.value);
    e.preventDefault(); //NEEDED
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Enter amount of guests:
          <input value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Update" />
      </form>
    );
  }
}

// *******************
class Calendar extends React.Component {
    render() {
        return(
            <div>
                <p> insert calendar here: <br /> </p>
            </div>
        );
    }
}

// *******************
class MiscForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: '', name: '', email: ''};
    }
    handleTimeChange(e) {
        this.setState({time: e.target.value});
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleSubmit(e) {
        this.props.changeTime(this.state.time);
        this.props.changeName(this.state.name);
        this.props.changeEmail(this.state.email);
        e.preventDefault(); //NEEDED
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Time of arrival:
                        <select value={this.state.value} onChange={this.handleTimeChange.bind(this)}>
                            <option value="18.00"> 18.00 </option>
                            <option value="18.30"> 18.30 </option>
                            <option value="19.00"> 19.00 </option>
                            <option value="19.30"> 19.30 </option>
                        </select>
                    </label>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleNameChange.bind(this)} />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={this.state.value} onChange={this.handleEmailChange.bind(this)} />
                    </label>
                    <input type="submit" value="Book" />
                </form>
            </div>
        );
      }
}

// // *******************
// class BookingSubmit extends React.Component {
//     render() {
//         return(
//             <div>
//               <form onSubmit={this.handleSubmit}>
//                     <input type="submit" value="Submit" />
//               </form>
//             </div>
//             );
//     }
// }



/*
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.type}:
          <input type="int" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
*/
