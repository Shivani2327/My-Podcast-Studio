import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';

import Signup from './components/Signup';
import ListPodcast from './components/ListPodcast';
import AddPodcast from './components/AddPodcast';
import { AnimatePresence } from 'framer-motion';


function App() {
  return (
    <div>

      <AnimatePresence>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route element={<Navigate to="/login" />} path="/" />
            <Route element={<Login />} path="login" />


            <Route element={<Signup></Signup>} path="signup" />
            <Route element={<ListPodcast></ListPodcast>} path="listpodcast" />
            <Route element={<AddPodcast></AddPodcast>} path="addpodcast" />


            <Route element={<NotFound></NotFound>} path="*" />
            

          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
