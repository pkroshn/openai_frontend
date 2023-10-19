import logo from './logo.svg';
import { AuthProvider } from './AuthContext';
import './App.css';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth(); // Get the user object from the context
  console.log(user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
