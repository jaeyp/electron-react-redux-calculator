/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - creates file.
 *    Aug/20/2019 - toInfix().
 */
import stack from "./stack";

/**
 *  Token Types and Seperator
 */
const tknT = {
    UNKNOWN: -1,
    OPERAND: 0,
    OPERATOR: 1,
    SEPERATOR: ' '
}
/**
 *  Operator Types 
 */
const opT = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    MODULUS: '%',
    POWER: '^',
    LEFT_PARENTHESIS: '(',
    RIGHT_PARENTHESIS: ')'
}
/**
 *  function getType(c)
 *  note: 
 *      gets token type of input charactor.
 */
const getType = c => {
    if(!isNaN(c) || c === '.')
        return tknT.OPERAND;
    switch(c) {
        case opT.ADDITION:
        case opT.SUBTRACTION:
        case opT.MULTIPLICATION:
        case opT.DIVISION:
        case opT.MODULUS:
        case opT.POWER:
        case opT.LEFT_PARENTHESIS:
        case opT.RIGHT_PARENTHESIS:
            return tknT.OPERATOR;
        default:
            return tknT.UNKNOWN;
    }
}
/**
 *  function getPriority(c)
 *  note: 
 *      gets operator priority of input charactor.
 */
const getPriority = c => {
    let priority = -1;
    switch(c) {
        case opT.POWER:
            priority = 0;
            break;
        case opT.MULTIPLICATION:
        case opT.DIVISION:
        case opT.MODULUS:
            priority = 1;
            break;
        case opT.ADDITION:
        case opT.SUBTRACTION:
            priority = 2;
            break;
        case opT.LEFT_PARENTHESIS:
            priority = 3;
            break;
        default:
            break;
    }
    return priority;
}

/** 
 *  Boolean Functions
 */
const isString = exp => {return typeof exp === 'string'}
const isOperand = c => {return getType(c) === tknT.OPERAND}
const isOperator = c => {return getType(c) === tknT.OPERATOR}
const isLeftParenthesis = c => {return c === opT.LEFT_PARENTHESIS}
const isRightParenthesis = c => {return c === opT.RIGHT_PARENTHESIS}
const isBlank = c => {return c === ' '}
const isPrior = (c1, c2) => {return getPriority(c1) > getPriority(c2)}
const isPriorOrEqual = (c1, c2) => {return getPriority(c1) >= getPriority(c2)}
const isSign = (str, pos) => {
    /**
     * Check if charactor is sign.
     * 1. if the string starts with '+' or '-', it's a sign.
     * 2. if the previous charactor is operator excepts for parenthesis and followed by number,
     *      it's also a sing.
     */
    if(str[pos] === '+' || str[pos] === '-') {
        if((pos === 0) ||
           ((str[pos-1] !== opT.RIGHT_PARENTHESIS) &&
            (getType(str[pos-1]) === tknT.OPERATOR) &&
            (getType(str[pos+1]) === tknT.OPERAND))) {
            return true;
        }
    }
    return false;
}

/**
 *  function toPostfix(infix)
 *  note: 
 *      transforms infix expression into postfix.
 */ 
const toPostfix = infix => {
    let postfix = "";
    stack.clear();
    
    try {
        // traverse infix expression
        for(let pos=0; pos<infix.length; pos++) {
            let c = infix[pos];
            // number case
            if(isBlank(c)) continue;
            if(isOperand(c) || isSign(infix, pos)) {
                postfix += c;
                continue;
            }
            else if(!isOperator(c))
                throw new Error('Wrong expression');

            // operator case
            if(isLeftParenthesis(c))
                stack.push(c);
            else if(isRightParenthesis(c)) {
                while(!stack.isEmpty() && !isLeftParenthesis(stack.peek())) {
                    postfix += tknT.SEPERATOR; // add a token seperator
                    postfix += stack.pop();
                }
                if(stack.isEmpty())
                    throw new Error('Wrong expression: no left parenthesis')
                else // pop left parenthesis
                    stack.pop();
            }
            else { // operators execpt for parenthesis
                postfix += tknT.SEPERATOR; // add a token seperator
                while(!stack.isEmpty() && isPriorOrEqual(c, stack.peek())) {
                    postfix += stack.pop();
                    postfix += tknT.SEPERATOR;
                }
                stack.push(c);
            }
        }
        // pop the rest operators
        while(!stack.isEmpty()) {
            postfix += tknT.SEPERATOR;
            postfix += stack.pop();
        }
    } catch(e) {
        console.log(e.name + ' : ' + e.message);
    }
    return postfix;
}

/**
 *  function toInfix(postfix)
 *  note: 
 *      transforms postfix expression into infix.
 */ 
const toInfix = postfix => {
    let infix, rval, lval;
    let prev; // previous item
    stack.clear();

    let tokens = postfix.split(tknT.SEPERATOR); 
    // TODO: adds error throw cases.
    try {
        tokens.forEach(item => {
            if (!prev) prev = item;
    
            if (isOperand(item)) {
                stack.push(item);
            } else {
                // if found operator, pop previous two numbers, 
                // then makes and pushes infix expression from the numbers.
                rval = stack.pop();
                lval = stack.pop();
    
                if(stack.getSize() > 0 && isPrior(item, prev))
                    stack.push(`( ${lval} ${item} ${rval} )`);
                else
                    stack.push(`${lval} ${item} ${rval}`);
                prev = item;
            }
        });
        infix = stack.pop().replace(/\s/g, ''); // remove blank spaces for infix
    } catch(e) {
        console.log(e.name + ' : ' + e.message);
    }
    return infix;
}

/**
 *  function calculate(expression)
 *  note:
 *      calcultes input expression and returns the result.
 *      input expression should be postfix format.
 */
const calculate = (expression, mode='infix') => {
    if (!isString(expression)) return '';
    if (mode === 'infix') expression = toPostfix(expression);

    let result, rval, lval = 0;
    let tokens = expression.split(tknT.SEPERATOR); // tokenize postfix expression
    stack.clear();

    try {
        tokens.forEach(item => {
            if(isNaN(item)) { // operator case
                if(stack.getSize() < 2)
                    throw new Error('Wrong expression');
                
                rval = parseFloat(stack.pop());
                lval = parseFloat(stack.pop());
    
                switch(item[0]) {
                    case opT.ADDITION:
                        stack.push(lval + rval);
                        break;
                    case opT.SUBTRACTION:
                        stack.push(lval - rval);
                        break;
                    case opT.MULTIPLICATION:
                        stack.push(lval * rval);
                        break;
                    case opT.DIVISION:
                        stack.push(lval / rval);
                        break;
                    case opT.MODULUS:
                        stack.push(lval % rval);
                        break;
                    case opT.POWER:
                        stack.push(lval ** rval);
                        break;
                    default:
                        break;
                }
            }
            else { // operand case (number)
                stack.push(item);
            }
        });
        result = stack.pop();
    } catch(e) {
        console.log(e.name + ' : ' + e.message);
    }

    return result;
}

export default calculate;
export { toPostfix, toInfix };