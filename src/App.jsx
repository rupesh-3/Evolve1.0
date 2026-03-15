import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CosmicBackground from './components/CosmicBackground';
import Landing from './components/Landing';
import Registration from './components/Registration';
import Payment from './components/Payment';
import Success from './components/Success';
import ProblemSelection from './components/ProblemSelection';

function App() {
  return (
    <>
      <CosmicBackground />
      <div className="bg-particles">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/select-problem" element={<ProblemSelection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
