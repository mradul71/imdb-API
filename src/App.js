import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Movie from './components/Movie';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='header'>
          <Link to='/' className='links'>
            <div className='back'>
              <div><ArrowBackIosNewIcon className='icon' /></div>
              <div className='home-back'>Back to Home</div>
            </div>
          </Link>
          <div className='movieApp'>
            Movie Browsing App
          </div>
          <div className='back-two'>
              <div><ArrowBackIosNewIcon className='icon' /></div>
              <div>Back to Home</div>
            </div>
        </div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/movie/:id" element={<Movie />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
