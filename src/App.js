// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import AccountList from './pages/AccountList';
import AccountDetail from './pages/AccountDetail';
import NoPage from './pages/NoPage';
import AccountState from './context/AccountState';

function App() {
  return (
    <AccountState>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route path="detail/:accountId" element={<AccountDetail />} />
            <Route index element={<AccountList />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountState>    
  );
}

export default App;
