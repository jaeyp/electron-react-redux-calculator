/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - creates file.
 *    Aug/20/2019 - supports of dual mode (infix/postfix).
 */
import calculate, { toPostfix, toInfix } from "../../util/calculator"

// defines action type
const CLICKBUTTON = 'calculator/CLICKBUTTON';

// defines a function that creates an action
// we should export these functions in order to be called outside
export const clickButton = (inputValue) => ({ type: CLICKBUTTON, val: inputValue });

// defines initial status for this module
const initialState = {
    // input expression
    expression: '',
    // output result from calculation
    result: 0,
    // calculator mode in infix/postfix
    mode: 'infix'
};

/**
 *  Command Types 
 */
const cmdT = {
    TOPOSTFIX: 'infix',
    TOINFIX: 'postfix',
    BACKSPACE: '<',
    SPACE: 'SP',
    ALLCLEAR: 'AC',
    SIGNTOGGLE: 's',
    CALCULATE: '=',
    POWER: 'exp',
    MODULUS: 'mod'
}

// create and export a reducer
export default function reducer(state = initialState, action) {
    // reducer manipulates and returns state according to action type
    // for default set: state = initialState
    switch(action.type) {
        case CLICKBUTTON:
            let command = action.val.toString();

            // supports continuing calculation from previous result
            if (state.expression === '' && state.result !== 0)
                state.expression = state.result.toString();
                
            switch(command) {
                case cmdT.TOPOSTFIX:
                    if(state.expression)
                        state.expression = toPostfix(state.expression);
                    state.mode = 'postfix';
                    break;
                case cmdT.TOINFIX:
                    if(state.expression)
                        state.expression = toInfix(state.expression);
                    state.mode = 'infix';
                    break;
                case cmdT.BACKSPACE:
                    if(state.expression.length > 0)
                        state.expression = state.expression.slice(0, -1);
                    break;
                case cmdT.SPACE:
                    if(typeof state.expression === 'string')
                        state.expression += ' ';
                    break;
                case cmdT.ALLCLEAR:
                    state.expression = '';
                    state.result = 0;
                    break;
                case cmdT.SIGNTOGGLE:
                    // TODO: toggle + and -
                    break;
                case cmdT.CALCULATE:
                    state.result = calculate(state.expression, state.mode);
                    state.expression = '';
                    break;
                case cmdT.POWER:
                    state.expression += '^';
                    break;
                case cmdT.MODULUS:
                    state.expression += '%';
                    break;
                default:
                    state.expression += command;
                    break;
            }
            return { expression: state.expression, result: state.result , mode: state.mode};
        default:
            return state; // do nothing
    }
}