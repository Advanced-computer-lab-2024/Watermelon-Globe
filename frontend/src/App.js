import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import ActivityCategory from './pages/ActivityCategory';
import PreferenceTag from './pages/PrefenceTag';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/ActivityCategory'
              element={<ActivityCategory />}
            />  
            <Route
              path='/PreferenceTag'
              element={<PreferenceTag />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
