import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import { Link, Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Demo JSON-SERVER
      </header>
      <div className="container">
        <Link to="/list">Product List</Link> | {" "}
        <Link to="/form">Add new</Link>
        <hr />
        <Routes>
          <Route path='/list' Component={ProductList}></Route>
          <Route path='/form' Component={ProductForm}></Route>
          <Route path='/form/:id' Component={ProductForm}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
