import './App.css';
import { Routes, Route } from 'react-router-dom'
import User from './routes/User';


function App() {

  return (
    <div className="App" style={{ marginBottom: '50px' }}>
      <Routes>
        <Route element={<User />} path='/*' />
      </Routes>
    </div>
  );
}

export default App;
