'use strict';

import * as React from "react";

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: props.date
        }
    }
    
    render() {
        return (
            <th>{ this.state.date.getDate() }</th>
        );
    }
}

class CalendarRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: new Date(props.date),
            elements: [...new Array(7)].map(
                (_, day) => {
                    return <CalendarDay key={day} date={ props.date.add({ date: day }) } />
                }
            )
        }
    }
    
    render() {
        return (
            <tr key={this.state.week}>{ this.state.elements }</tr>
        );
    }
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        
        let year = props.date.getFullYear();
        let month = props.date.getMonth();

        let firstOfMonth = new Date(Date.UTC(year, month));
        let firstWeekday = (firstOfMonth.getDay() + 6) % 7;
        let startOfCalendar = new Date(firstOfMonth).add({ date: -firstWeekday });
        
        this.state = {
            date: firstOfMonth,
            rows: [...new Array(6)].map(
                (_, week) => {
                    return <CalendarRow key={week} date={ startOfCalendar.add({ date: week*7 }) } />
                }
            )
        };
    }
    
    render() {
        return (
            <table className="calendar">
                <tbody>{ this.state.rows }</tbody>
            </table>
        );
    }
}

Date.prototype.add = function(arg, months, date, hours, minutes, seconds, millis) {
    let result = new Date(this);

    if (typeof arg === "object") {
        if (arg["year"]) { result.setFullYear(result.getFullYear() + arg["year"]); }
        if (arg["month"]) { result.setFullYear(result.getFullYear() + arg["month"]); }
        if (arg["date"]) { result.setDate(result.getDate() + arg["date"]); }
        if (arg["hours"]) { result.setHours(result.getHours() + arg["hours"]); }
        if (arg["minutes"]) { result.setMinutes(result.getMinutes() + arg["minutes"]); }
        if (arg["seconds"]) { result.setSeconds(result.getSeconds() + arg["seconds"]); }
        if (arg["millis"]) { result.setMilliseconds(result.getMilliseconds() + arg["millis"]); }
    } else if (typeof arg === "number") {
        result.setFullYear(result.getFullYear() + arg);

        if (typeof months  === "number") { result.setMonth(result.getMonth() + months); }
        if (typeof date    === "number") { result.setDate(result.getDate() + date); }
        if (typeof hours   === "number") { result.setHours(result.getHours() + hours); }
        if (typeof minutes === "number") { result.setMinutes(result.getMinutes() + minutes); }
        if (typeof seconds === "number") { result.setSeconds(result.getSeconds() + seconds); }
        if (typeof millis  === "number") { result.setMilliseconds(result.getMilliseconds() + millis); }
    }

    return result;
};

export { Calendar };