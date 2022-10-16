import React from "react"
import { BrowserRouter as Router} from "react-router-dom" ;
import {DataProvider} from "./Globalstate.js"
import Header from "./components/Header/Header.js"
import MainPages from "./components/mainpages/Pages.js"

function App()
{
  return (
    <DataProvider>
      <Router>
        <div className = "App">
          <Header />
          <MainPages/>
        </div>
      </Router>
    </DataProvider>
   
    
  )
}

export default App ;