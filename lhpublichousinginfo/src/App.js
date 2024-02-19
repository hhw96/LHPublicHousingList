import { Route, Routes } from 'react-router-dom';
import './App.css';
import './css/style.css';
import ListContainer from './container/ListContainer';
import ViewContainer from './container/ViewContainer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ListContainer/>} />
      <Route path='/view' element={<ViewContainer/>} />
    </Routes>
  );
}

export default App;
