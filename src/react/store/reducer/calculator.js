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
/**
 * reducer
 *  note:
 *      it should be pure function.
 *      it manipulates and returns new state according to action type.
 * @param {*} state 
 * @param {*} action 
 */
export default function reducer(state = initialState /* default set */, action) {
    let { expression, result, mode } = state; // destructuring assignment

    switch(action.type) {
        case CLICKBUTTON:
            let command = action.val.toString();

            // supports continuing calculation from previous result
            if (state.expression === '' && state.result !== 0)
                expression = state.result.toString();
                
            switch(command) {
                case cmdT.TOPOSTFIX:
                    if(state.expression)
                        expression = toPostfix(state.expression);
                    mode = 'postfix';
                    break;
                case cmdT.TOINFIX:
                    if(state.expression)
                        expression = toInfix(state.expression);
                    mode = 'infix';
                    break;
                case cmdT.BACKSPACE:
                    if(state.expression.length > 0)
                        expression = state.expression.slice(0, -1);
                    break;
                case cmdT.SPACE:
                    if(typeof state.expression === 'string')
                        expression += ' ';
                    break;
                case cmdT.ALLCLEAR:
                    expression = '';
                    result = 0;
                    break;
                case cmdT.SIGNTOGGLE:
                    // TODO: toggle + and -
                    break;
                case cmdT.CALCULATE:
                    result = calculate(state.expression, state.mode);
                    expression = '';
                    break;
                case cmdT.POWER:
                    expression += '^';
                    break;
                case cmdT.MODULUS:
                    expression += '%';
                    break;
                default:
                    expression += command;
                    break;
            }
            /**
             * Redux just compares the address of input and output state objects in order to check mutation. (shallow-compare)
             * So we must return new state object.
             */
            // Actually, this spread operator with state is not necessary here, because this reducer updates all the state properties.
            // I just added it as an example.
            return { ...state, expression, result, mode };
        default:
            return state; // do nothing
    }
}