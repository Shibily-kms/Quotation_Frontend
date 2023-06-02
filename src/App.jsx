import './App.css';
import { Routes, Route } from 'react-router-dom'
import User from './routes/User';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import { loginUser } from './redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const { user } = useSelector((state) => state.userAuth)
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch()
  
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(loginUser(id))
    } else if (!user?._id) {
      window.location.href = 'http://localhost:3001/'
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<User />} path='/*' />
      </Routes>
    </div>
  );
}

export default App;
