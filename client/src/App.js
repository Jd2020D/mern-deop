import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Main from './views/Main';
function App() {
  return (
    <Router>
      <div className="App">
        <Main/>

      </div>
    </Router>
  );
}
export default App;