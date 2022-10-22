import React, { useState } from 'react';
import Analyse from './components/Analyse';
import Inspection from './components/Inspect'

function App() {

  // Toggle Mode to  display either data entry module or data analysis module

  const [toggleMode, setNewToggleMode] = useState(false);
  
  // Data entry module
  const inspectionScreen = (
    <div>
      <h2>Inspect-It</h2>
      <Inspection />
    </div>
  )

  // Data analysis mode
  const analyseScreen = (
  <div>
    <h2>Analyse-It</h2>
    <Analyse /> 
  </div>
  )

  return (<div className="App">
    <select onChange={() => { setNewToggleMode(!toggleMode) }}>
      <option value="Inspect">INSPECT</option>
      <option value="Analyse">ANALYSE</option>
    </select>
  {/* switch between Analysing and Inspection modules*/}
    <div>{toggleMode ? analyseScreen : inspectionScreen}</div>
  </div>);
}
export default App;
