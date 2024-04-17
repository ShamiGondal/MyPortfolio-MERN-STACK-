import  { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import Hireme from './Components/Hireme';
import Moreonme from './Components/Moreonme';
import Services from './Components/Services';
import DesiginingPortfolio from './Components/DesiginingPortfolio';
import CodingPortfolio from './Components/CodingPortfolio';
import ProjectDetails from './Components/ProjectDetails';
import Reservations from './Components/Reservations';
import Testimonials from './Components/Testimonails';
import Loader from './Components/Loader';
import Blogs from './Components/Blogs';
import ProjectHandling from './Components/ProjectHandling';

function App() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchData = async () => {

      // use setTimeout to simulate fetching data after 2 seconds
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        // Loader component goes here
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavBar />}>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path='/HireMe' element={<Hireme />}></Route>
              <Route path='/Moreonme' element={<Moreonme />}></Route>
              <Route path='/Services' element={<Services />}></Route>
              <Route path='/Designs' element={<DesiginingPortfolio />}></Route>
              <Route path='/Coding' element={<CodingPortfolio />}></Route>
              <Route path='/Reservations' element={<Reservations />}></Route>
              <Route path="/projects/:slug" element={<ProjectDetails />} ></Route>
              <Route path="/Testimonials" element={<Testimonials />} ></Route>
              <Route path="/Blogs" element={<Blogs/>} ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
