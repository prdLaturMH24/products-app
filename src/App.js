import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import Home from './pages/Home/Home';
import NavBar from './components/Nav/NavBar';
import UserProfile from './pages/Profile/UserProfile';
import Cart from './components/Cart/Cart';
import Details from './components/Product/Details/Details';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable to keep track of whether user is logged in or not
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = React.useState([]);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
      const items = JSON.parse(localStorage.getItem('cartItems'));
      if (items && items.length > 0) {
        setCartItems([...items]);
      }
      else {
        setCartItems([]);
      }
      setIsLoggedIn(true);
    } else {
      setUser({});
      setIsLoggedIn(false);
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  }

  const handleDecrement = (item) => {
    let newCartItems = cartItems;
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].id === item.id) {
        if (newCartItems[i].quantity > 1) {
          newCartItems[i].quantity--;
        }
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems([...newCartItems]);
  };

  const handleIncrement = (item) => {
    let newCartItems = cartItems;
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].id === item.id) {
        if (newCartItems[i].quantity >= 0 && newCartItems[i].quantity < item.stock) {
          newCartItems[i].quantity++;
        }
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems([...newCartItems]);
  };


  const handleCartItemRemove = (item) => {
    let newCartItems = cartItems.filter((x) => x.id !== item.id);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems([...newCartItems]);
  };

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('user');
    setUser({});
    setIsLoggedIn(false);
  }
  return (

    <Router>
      <header className="App-header">
        <NavBar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} onSearchSubmit={handleSubmit} onSearch={(v) => setSearchTerm(v)}></NavBar>
      </header>
      <main className='main' role='main'>
        <Routes>
          {
            isLoggedIn ?
              <>
                <Route path="/" element={<Home searchKey={searchTerm}></Home>} />
                <Route path="/profile/:id" element={<UserProfile user={user}></UserProfile>} />
                <Route path='/cart/:id'
                  element={<Cart
                    cartItems={cartItems}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                    onRemoveCartItem={handleCartItemRemove}
                    ></Cart>}>
                </Route>
                <Route path="/product/details/:productId" element={<Details></Details>} />
              </>
              :
              <Route path="/" element={<LoginForm onLogin={(token) => handleLogin(token)}></LoginForm>} />
          }
        </Routes>
      </main>
    </Router>
  );
}

export default App;
