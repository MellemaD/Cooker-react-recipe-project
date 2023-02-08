import './App.css';
import React from 'react';
import Footer from "./containers/footer/Footer";
import Header from "./containers/Header";
import Pages from "./pages/Pages";

function App() {


  return (
      <div className="App">
          <Header/>

          <Pages/>
          {/*Includes routes/route*/}

          <Footer/>
    </div>
  );
}

export default App;
