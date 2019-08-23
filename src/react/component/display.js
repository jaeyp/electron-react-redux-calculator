/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/20/2019 - creates file.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// display pannel
class Display extends Component {
    render() {
        return (
            <div className='display'>
                <div className='expression'>
                    {this.props.expression}
                </div>
                <div className='result'>
                    {this.props.result}
                </div>
            </div>
        );
    }
}

// connect reducer's state and dispatch routine with action to Component.
export default connect(
    // map reducer's state members to props.
    // this state mapping allows us to access this.props.expression and this.props.result.
    (state) => ({
        /* in case that we have only one reducer
         * we can access state member of reducer directly.
         * state.state_member
         */
        // expression: state.expression
        // result: state.result

        /* in case that we have multiple reducers using combineReducers of redux
         * state.ruducer_name.state_member
         */
        expression: state.calculator.expression,
        result: state.calculator.result
    }), 
    // map dispatch routines of reducer's actions to props.
    (dispatch) => ({})
)(Display);