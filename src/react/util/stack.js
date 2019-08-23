/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - creates stack closure.
 */
// stack
const stack = (function() {
    // private variables
    let _size = 0;
    let _stack = {};
    
    // private functions
    let _push = data => {
        _stack[_size++] = data;
    }
    let _pop = () => {
        return _stack[(_size>0)?--_size:0];
    }
    let _peek = () => {
        return _stack[(_size>0)?_size-1:0];
    }
    let _clear = () => {
        _stack = {};
    }
    let _traverse = () => {
        for(let pos = 0; pos<_size; pos++)
            console.log(_stack[pos]+" ");
    }
    let _isEmpty = () => {
        return _size === 0;
    }
    let _getSize = () => {
        return _size;
    }
    /**
     *  Closure 
     *  A closure is a function or the combination of a function bundled together (enclosed) 
     *  with references to its surrounding state (the lexical environment). 
     *  In other words, a closure gives you access to an outer function’s scope 
     *  from an inner function.
     */
    return {
        push: _push,
        pop: _pop,
        peek: _peek,
        clear: _clear,
        traverse: _traverse,
        isEmpty: _isEmpty,
        getSize: _getSize
    };
}());

export default stack;