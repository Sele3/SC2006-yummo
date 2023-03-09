import logo from './logo.svg';
import './App.css';
import Routing from './components/Routing';
import PersonList from './components/PersonList.js';

function App() {
  return (
    <div className="App">
      <h3>Persons</h3>
      <PersonList />
    </div>
  );
}

export default App;
