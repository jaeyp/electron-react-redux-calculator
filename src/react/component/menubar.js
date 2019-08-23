/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/21/2019 - creates file.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as calculatorActions from '../store/reducer/calculator';

class MenuBar extends Component {
    render() {
        return (
            <div className={'menubar'}>
                <div className={'title'}>
                    {`${this.props.title} v${this.props.version}`}
                </div>
                <div className={'mode'}>
                    <button className={`menubar mode-${this.props.mode}`} 
                        onClick={() => this.props.clickButton(this.props.mode)}>
                        {this.props.mode}
                    </button>
                </div>
            </div>
        );
    }
}

// connect reducer's state and dispatch routine with action to Component.
export default connect(
    // map reducer's state members to props.
    // this state mapping allows us to access this.props.mode in MenuBar context.
    (state) => ({
        mode: state.calculator.mode
    }), 
    // map dispatch routines of reducer's actions to props.
    // this dispatch mapping allows us to dispatch reducer's action from user event.
    (dispatch) => ({
        clickButton: (inputValue) => {
            //alert(`button: ${inputValue}`);
            dispatch(calculatorActions.clickButton(inputValue));
        }
    })
)(MenuBar);