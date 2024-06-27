import {Route, Routes, BrowserRouter} from 'react-router-dom';

// importing bloglist and blogview for rendering on trigering user action
import Bloglist from './Component/BlogList';
import BlogView from './Component/BlogView';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Bloglist} />
        <Route path='/blog/:id' Component={BlogView} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;