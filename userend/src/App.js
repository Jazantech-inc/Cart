import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/index"
import Login from "./pages/Login/index"
import Signup from "./pages/Signup/index"
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import SingleProduct from "./pages/SingleProduct";
function App() {
  const {loading} = useSelector(state => state.loaders);  
  return (
           <div>
           {loading && <Loader />}
           <Router>
              <Routes>
                 <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                 <Route path="/products/:id" element={<ProtectedRoute> <SingleProduct /> </ProtectedRoute>} />
                 <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                 <Route path="/admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<Signup />} />
              </Routes>
           </Router>
           </div>
  );
}

export default App;
