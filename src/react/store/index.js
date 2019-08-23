import { createStore } from 'redux';
import reducers from './reducer';   // combined reducers

// create and return a store
const configure = () => {
    const store = createStore(reducers);
    return store;
}

export default configure(); // export a store created