import {React, useState} from 'react';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import './App.css';

import People from './components/People';
import Planets from './components/Planets';
import './App.css';
import img from './Ben_Kenobi.png';

function App() {
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(null);
  const [valid, setValid] = useState(true);
  let history = useHistory();

  const handleSelect = (evt) => {
    setCategory(evt.target.value);
  };
  const handleInput = (evt) => {
    setId(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (id && category) {
      switch (category) {
        case 'people':
          history.push(`/people/${id}`);
          break;
        case 'planets':
          history.push(`/planets/${id}`);
          break;
        default:
          break;
      }
    } else {
      setId(null);
    }
    setValid(true);

  }
  return (
    <div id="search">
      <h1>SWAPI</h1>
      <form onSubmit={ handleSubmit }>
        <label>Search for:</label>
        <select onChange={ handleSelect }>
          <option value="">Please Select a Category</option>
          <option value="people">People</option>
          <option value="planets">Planets</option>
        </select>
        <label>ID</label>
        <input type="number" min={1} onChange={handleInput} />
        <button>Search</button>
      </form>
      <div id="result">
        { 
          valid ? 
          <Switch>
            <Route path="/people/:id">
            <People setValid={setValid} />
            </Route>
            <Route path="/planets/:id">
            <Planets setValid={setValid} />
            </Route>
          </Switch> :
          <div>
            <h3>These aren't the droids you're looking for</h3>
            <img src={img} alt="Obi-Wan Kenobi" /> 
          </div>
        }
      </div>
    </div>
  );
}

export default App;
