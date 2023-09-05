import logo from './logo.svg';
import { AuthProvider } from './AuthContext';
import './App.css';
import SignIn from './components/Signin';
import Dashboard from './components/Dashboard';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth(); // Get the user object from the context
  console.log(user)

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if user is authenticated */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        {/* Show dashboard if user is authenticated, else show nothing */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
    </Routes>
    </Router>
  );
}

export default App;
