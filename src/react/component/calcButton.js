/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - creates file.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as calculatorActions from '../store/reducer/calculator';

/* Functional Components
const CalcButton = ({
    value,
    htmlCode,
    additionalClass
}) => {
    return (
        <button 
            className={`calc-input ${additionalClass}`}
            //onClick={onClickNumber}
            onClick={() => {alert(value); clickNumber(value);}}
        >
        {htmlCode ? String.fromCharCode(htmlCode) : value}
        </button>
    );
};
*/

// Class Components
class CalcButton extends Component {
    render() {
        return (
        <button className={`calc-input ${this.props.additionalClass}`} 
            onClick={() => this.props.clickButton(this.props.value)}>
            {this.props.htmlCode ? String.fromCharCode(this.props.htmlCode) : this.props.value}
        </button>
        );
    }
}

// connect reducer's state and dispatch routine with action to Component.
export default connect(
    // map reducer's state members to props.
    (state) => ({}), 
    // map dispatch routines of reducer's actions to props.
    // this dispatch mapping allows us to dispatch reducer's action from user event.
    (dispatch) => ({
        clickButton: (inputValue) => {
            //alert(`button: ${inputValue}`);
            dispatch(calculatorActions.clickButton(inputValue));
        }
    })
)(CalcButton);