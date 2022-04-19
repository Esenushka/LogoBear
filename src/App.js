import './App.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Jogs from './pages/Jogs';
import LetMeIn from './pages/LetMeIn';
import Info from './pages/Info';
import Contact from './pages/Contact';
import Header from './components/Header';
import PrivateRoute from './route/PrivateRoute';
import { useEffect, useState } from 'react';
import PublicRoute from './route/PublicRoute';

const initialData = JSON.parse(localStorage.getItem("data"))
function App() {
  const [auth, setAuth] = useState(initialData)

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(auth))
  }, [auth]);

  
  const [dateFrom, setDateFrom] = useState(0)
  const [dateTo, setDateTo] = useState(0)
  const [activeBurger, setActiveBurger] = useState(false)

  return (
    <BrowserRouter>
      <div>
        <Header setDateFrom={setDateFrom} activeBurger={activeBurger} setActiveBurger={setActiveBurger} setDateTo={setDateTo} />
        <Routes>
          <Route
            path="/"
            element={<PublicRoute auth={auth} component={<LetMeIn setAuth={setAuth} />} />}
          />
          <Route
            path='/jogs'
            element={<PrivateRoute auth={auth} component={<Jogs activeBurger={activeBurger} dateTo={dateTo} dateFrom={dateFrom} />} />} />
          <Route path='/info' element={<PrivateRoute auth={auth} component={<Info/>} />} />
          <Route path='/contact' element={<PrivateRoute auth={auth} component={<Contact/>} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
