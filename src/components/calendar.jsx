'use strict';

import * as React from "react";

import { Locale } from "../lib/locale.js";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        
        let startOfWeek = Calendar.getStartOfWeek();
        
        if (this.props.startOfWeek) {
            startOfWeek = {
                "mon":  0, "monday":    0, "0":   0,
                "sun": -1, "sunday":   -1, "-1": -1,
                "sat": -2, "saturday": -2, "-2": -2
            }[this.props.startOfWeek.toLowerCase()] || startOfWeek;
            if (typeof nextProps === "number") {
                startOfWeek = nextProps.startOfWeek;
            }
        }
        
        this.state = {
            year: props.year,
            month: props.month,
            locale: props.locale,
            startOfWeek: startOfWeek
        };
    }
    
    componentWillReceiveProps(nextProps) {
        let startOfWeek = this.state.startOfWeek;

        if (nextProps.startOfWeek) {
            if (nextProps.startOfWeek != this.state.startOfWeek) {
                startOfWeek = {
                    "mon":  0, "monday":    0, "0":   0,
                    "sun": -1, "sunday":   -1, "-1": -1,
                    "sat": -2, "saturday": -2, "-2": -2
                }[nextProps.startOfWeek.toLowerCase()];
                if (startOfWeek === undefined) {
                    startOfWeek = this.state.startOfWeek;
                }
                if (typeof nextProps === "number") {
                    startOfWeek = nextProps.startOfWeek;
                }
            }
        } else if (nextProps.locale) {
            startOfWeek = Calendar.getStartOfWeek(nextProps.locale);
        }
        
        this.setState({
            year: nextProps.year || this.state.year,
            month: nextProps.month || this.state.month,
            locale: nextProps.locale || this.state.locale,
            startOfWeek: startOfWeek
        });
        
        return true;
    }
    
    render() {
        let viewStartDate = new Date(this.state.year, this.state.month-1);
        viewStartDate.setDate(
            viewStartDate.getDate() - viewStartDate.getDay() + 1 + this.state.startOfWeek);

        const current = new Date(Date.now());
        
        return (
            <table className="calendar">
                <thead className="calendar-header">
                    <tr>
                        <th>&#x25C0;</th>
                        <th className="calendar-month-label" colSpan={5}>
                            {
                                Calendar.getMonthName(this.state.month - 1, this.state.locale)
                            }
                        </th>
                        <th>&#x25B6;</th>
                    </tr>
                </thead>
                <tbody className="calendar-body">
                {
                    [...new Array(6)].map(
                        (_, index) => {
                            let weekStartDate = new Date(viewStartDate);
                            weekStartDate.setDate(weekStartDate.getDate() + 7*index);
                            return renderRow(weekStartDate);
                        }
                    )
                }
                </tbody>
            </table>
        );
        
        function renderRow(startDate) {
            return (
                <tr key={ startDate } className="calendar-week">
                    {
                        [...new Array(7)].map(
                            (_, index) => {
                                const date = new Date(startDate);
                                date.setDate(date.getDate() + index);
                                return renderDate(date);
                            }
                        )
                    }
                </tr>
            );
        }
        
        function renderDate(date) {
            const isCurrent =
                current.getFullYear() === date.getFullYear() &&
                current.getMonth() === date.getMonth() &&
                current.getDate() === date.getDate();

            const isCurrentMonth =
                current.getFullYear() === date.getFullYear() &&
                current.getMonth() === date.getMonth();

            return (
                <td key={ date } className={
                    `calendar-day${
                        isCurrent ? " calendar-day-current" : ""
                        }${
                        isCurrentMonth ? "" : " calendar-day-not-current-month"
                        }`
                }>{ date.getDate() }</td>
            );
        }
    }
    
    static getStartOfWeek(locale = Locale.getDefaultLocale()) {
        if (locale.getTerritory() === "US") {
            return -1;
        }
        
        return 0;
    }
    
    static getMonthName(month, locale = Locale.getDefaultLocale()) {
        switch (locale.getLanguage()) {
            case 'sv':
                return [
                    "Januari",
                    "Februari",
                    "Mars",
                    "April",
                    "Maj",
                    "Juni",
                    "juli",
                    "Augusti",
                    "September",
                    "Oktober",
                    "November",
                    "December"
                ];
        }
        
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ][month];
    }
}

export { Calendar };