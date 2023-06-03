import './App.css';
import { Routes, Route } from 'react-router-dom'
import User from './routes/User';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route element={<User />} path='/*' />
      </Routes>
    </div>
  );
}

export default App;
