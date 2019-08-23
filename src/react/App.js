/**
 *  Title: react-redux-calculator
 *  Author: Jaehyun Park
 *  History: 
 *    Aug/19/2019 - v0.1.0
 *        start project 
 *    Aug/20/2019 - v0.2.0
 *        dual mode support (infix/postfix)
 *    Aug/22/2019 - v0.3.0
 *        electron support
 */
import React from 'react';
import './App.css';
import '../style/calculator.scss'
import { Provider } from 'react-redux';
import store from './store';
import Calculator from './component/calculator';
// electron
//import { channels } from '../shared/constants';
//const { ipcRenderer } = window;
/**
 *  To disable Electron Mode (enable React Mode)
 *  1. sets ELECTRON_MODE = false
 *  2. comments 'BROWSER=none' in .env file
 */
//const ELECTRON_MODE = false;

// electron
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: 'Calculator',
      appVersion: '0.3.0',
    };
/*	  
    if(ELECTRON_MODE) {
      ipcRenderer.send(channels.APP_INFO);
      ipcRenderer.on(channels.APP_INFO, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.APP_INFO);
        const { appName, appVersion } = arg;
        this.setState({ appName, appVersion });
      });
    }
*/
  }
  render() {
    const { appName, appVersion } = this.state;
    return (
      <Provider store={store}>
        <Calculator title={appName} version={appVersion}/>
      </Provider>
    );
  }
}

export default App;
