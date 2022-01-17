import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            {/* <Route path="/search_results" component={Result_page} /> */}
            {/* <Route path="/series" component={Series} />
            <Route path="/search" component={Search} /> */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
