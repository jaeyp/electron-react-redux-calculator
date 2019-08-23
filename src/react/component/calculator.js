/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - creates file.
 *    Aug/20/2019 - Display component.
 *    Aug/21/2019 - MenuBar component.
 */
import React, { Component } from 'react';
import CalcButton from './calcButton';
import Display from './display';
import MenuBar from './menubar';
import { connect } from 'react-redux';
import * as calculatorActions from '../store/reducer/calculator';

class Calculator extends Component {
    constructor(props) {
      super(props);
      this.keyHandler = this.keyHandler.bind(this);
    }
    keyHandler(e) {
        if(e.keyCode >= 48 && e.keyCode <= 57)
            this.props.clickButton(e.keyCode - 48);

        // TODO: support operator
        switch(e.keyCode) {
            case 8: // backspace
                this.props.clickButton('<');
                break;
            case 32: // space
                //this.props.clickButton('sp');
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.keyHandler, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyHandler, false);
    }
    render() {
        return (
            <div className='calculator'>
                <MenuBar title={this.props.title} version={this.props.version}/>
                <Display />

                <div className='calculator-inputs-row'>
                <CalcButton value="(" additionalClass="operatorSmall"/>
                <CalcButton value=")" additionalClass="operatorSmall"/>
                <CalcButton value="exp" additionalClass="operatorSmall"/>
                <CalcButton value="mod" additionalClass="operatorSmall"/>
                </div>

                <div className='calculator-inputs-row'>
                <CalcButton value="AC" additionalClass="operatorSmall"/>
                <CalcButton value='SP' additionalClass="operatorSmall" />
                <CalcButton value='<' additionalClass="operatorBig" />
                <CalcButton value="/" htmlCode="247" additionalClass="operatorBig" />
                </div>

                <div className='calculator-inputs-row'>
                <CalcButton value={7} />
                <CalcButton value={8} />
                <CalcButton value={9} />
                <CalcButton value='*' htmlCode="215" additionalClass="operatorBig" />
                </div>

                <div className='calculator-inputs-row'>
                <CalcButton value={4} />
                <CalcButton value={5} />
                <CalcButton value={6} />
                <CalcButton value='-' htmlCode="8722" additionalClass="operatorBig" />
                </div>

                <div className='calculator-inputs-row'>
                <CalcButton value={1} />
                <CalcButton value={2} />
                <CalcButton value={3} />
                <CalcButton value='+' htmlCode="43" additionalClass="operatorBig" />
                </div>
                
                <div className='calculator-inputs-row'>
                <CalcButton value='s' htmlCode="177" additionalClass="operatorBig" />  {/* sign */}
                <CalcButton value={0} />
                <CalcButton value="." additionalClass="operatorBig" />
                <CalcButton value="=" htmlCode="61" additionalClass="operatorBig" />
                </div>
            </div>
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
            dispatch(calculatorActions.clickButton(inputValue));
        }
    })
)(Calculator);
//export default Calculator;