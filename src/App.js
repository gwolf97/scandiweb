import './App.css';
import Nav from './Components/Nav';
import CategoryPage from './Components/CategoryPage';
import React from 'react';
import Data from './Components/Data';

function App() {

  const [miniCartOpen, setMiniCartOpen] = React.useState(false)


  return (
    <main>
      <Nav/>
      <Data/>
    </main>
  );
}

export default App;
