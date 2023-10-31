
import './App.css';
import Home from './Home';
import {Routes, Route} from "react-router-dom";
import ReadUser from './ReadUser';
import UpdateUser from './UpdateUser';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/readuser/:id' element={<ReadUser/>}></Route>
      <Route path='/updateuser/:id' element={<UpdateUser/>}></Route>
    </Routes>
    </>
  );
}

export default App;
