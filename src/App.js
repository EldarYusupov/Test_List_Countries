import React from 'react';
import ImageList from "./pages/ImageList/ImageList";
import OneImage from "./pages/OneImage/OneImage";
import {BrowserRouter as Router,  Route,  Routes} from "react-router-dom";


const App = () => {

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/image/:id" element={<OneImage/>}/>
                    <Route path="/" element={<ImageList/>}/>
                </Routes>
            </Router>

        </div>
    )
}

export default App