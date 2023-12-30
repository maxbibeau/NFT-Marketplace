import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create} from './pages'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
