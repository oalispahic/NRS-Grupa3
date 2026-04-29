import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Rezervacije from './pages/Rezervacije';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rezervacije" element={<Rezervacije />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 