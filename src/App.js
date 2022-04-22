import './App.css';
import React from 'react';
import Data from './Components/Data';
import {Component} from "react"

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <main>
      <Data/>
    </main>);
  }
}

export default App;
