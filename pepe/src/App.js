import UseState from './component/UseState';
import ClassState from './component/ClassState';
import './App.css';
import UseReducer from './component/useReducer';

function App() {
  return (
    <div className="App">
      <UseState name={"Pepe"}/>
      <ClassState name={"Pepe"}/>
      <UseReducer name={"Pepe"}/>
    </div>
  );
}

export default App;
