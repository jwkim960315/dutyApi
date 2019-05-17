import React from 'react';
import Calendar from './Calendar';
import AddIcon from '@material-ui/icons/Add';

import ArrowLeftAlt from '@material-ui/icons/ArrowLeft';
import ArrowRightAlt from '@material-ui/icons/ArrowRight';
import CompareArrows from '@material-ui/icons/CompareArrows';

import { TextField, Button } from '@material-ui/core';

import { reduxForm, Field } from 'redux-form';

import { connect } from 'react-redux';
import { getLoggedInUser } from "../actions";

class TradeDutyDatesPage extends React.Component {
    state = {
        userDutyDates: [],
        otherDutyDates: [],
        arrows: []
    }

    async componentDidMount() {
        await this.props.getLoggedInUser();
        this.setState({ userDutyDates: this.props.loggedInUser.dutyDates })
    }




    renderDutyDates = type => {
        let dutyDates = this.state[`${type}DutyDates`].map((dutyDates,index) => {
            return (
                <Field
                    key={`${type}DutyDates${index}`}
                    label="Duty Date"
                    name={`${type}DutyDates${type}`}
                    onChange={e => this.onInputChange(e,index,type)}
                    component={this.renderTextField}
                />)
        })

        dutyDates.push(<Button key="addDutyDate" onClick={() => this.onAddClick(type)}><AddIcon /></Button>);

        return dutyDates;
    }

    onInputChange = (event,index,type) => {
        let dutyDates = (type === 'user') ? this.state.userDutyDates.slice() : this.state.otherDutyDates.slice();

        dutyDates.splice(index, event.target.value);

        if (type === 'user') {
            this.setState({ userDutyDates: dutyDates });
        } else {
            this.setState({ otherDutyDates: dutyDates });
        }
    }



    renderTextField = ({ input, key, label, index, meta: { touched, invalid, error }, ...custom }) => {
        console.log(input);
        const value = (input.name.slice(0,4) === 'user') ? this.state.userDutyDates[index] : this.state.otherDutyDates[index];

        return (
            <TextField
                {...input}
                label={label}
                variant="outlined"
                color="primary"
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                value={value}
            />)
    }

    renderArrows = () => {
        let arrows = this.state.arrows.slice();

        return (
            arrows.map(arrow => {
                switch(arrow) {
                    case 'left':
                        return <ArrowLeftAlt />;
                    case 'right':
                        return <ArrowRightAlt />;
                    case 'both':
                        return <CompareArrows />;
                    default:
                        return <CompareArrows />;
                }
            })
        )
    }

    render() {
        return (
            <div className="root">
                <div className="leftColumn">
                    <Calendar
                        userDutyDates={this.state.userDutyDates}
                        otherDutyDates={this.state.otherDutyDates}
                        arrows={this.state.arrows}
                    />
                </div>
                <div className="rightColumn">
                    <div className="deleteButtons">

                    </div>
                    <div className="leftEraseButtons">

                    </div>
                    <div className="userDutyDates">
                        {this.renderDutyDates('user')}
                    </div>
                    <div className="arrows">
                        {this.renderArrows()}
                    </div>
                    <div className="otherDutyDates">
                        {this.renderDutyDates('other')}
                    </div>
                    <div className="rightEraseButtons">

                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    return { loggedInUser };
};

let TradeDutyDatesPageRF = reduxForm({
    form: 'tradeDutyDates'
})(TradeDutyDatesPage)

export default connect(mapStateToProps,{
    getLoggedInUser
})(TradeDutyDatesPageRF);