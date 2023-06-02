import './App.css';
import React from "react";


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ProfileForm from './components/ProfileForm';
import PersonList from './components/ProfileList';
import ProfileDetail from './components/ProfileDetails';
import ProfileEdit from './components/ProfileEdit';
import UserAuthentication from './components/Register';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/auth" element={<UserAuthentication />} />

        <Route element={<PersonList/>} path="/profile" />
        <Route element={<ProfileDetail/>} path="/profile/:id" />
        <Route element={<ProfileEdit/>} path="/edit/:id" />
       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
