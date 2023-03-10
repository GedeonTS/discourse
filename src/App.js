import { Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import HomePage from './pages/HomePage';
import VideoRoom from './pages/VideoRoom';
import './App.css'
 
function App() {
  return (
      <div className="wrapper">
          <NavBar />
          <div className="App">
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/videoroom" element={<VideoRoom />} />
              </Routes>
          </div>
          <Footer />
      </div>
  );
}

export default App;
