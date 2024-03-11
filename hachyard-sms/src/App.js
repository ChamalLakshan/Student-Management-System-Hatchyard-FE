import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./students/AddStudent";
import Footer from "./layout/Footer";
import EditStudent from "./students/EditStudent";


function App() {
  return (
    <div className="App">

      <Router>       
        <div>
        <Navbar />
        </div>
       <div className="container">
       <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addstudent" element={<AddStudent />} />
          <Route exact path="/editstudent/:id" element={<EditStudent />} />
        </Routes>
       </div>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
