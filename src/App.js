import React from 'react';
import './App.css';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cart from './Pages/Cart'; 
import WishList from './Pages/WishList'; 
import Login from './Pages/Login'; 
import Register from './Pages/Register'; 
import EditProfile from './Pages/EditProfile'; // Add import for EditProfile page
import MyOrders from './Pages/MyOrders'; // Add import for MyOrders page
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './components/SearchResults/SearchResults';
import { AuthProvider } from './Context/AuthProvider'; // Import AuthProvider
import ShopContextProvider from './Context/ShopContext'; // Import ShopContextProvider

function App() {
  return (
    <div>
      <AuthProvider>
        <ShopContextProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Shop/>}/>
              <Route path='/football' element={<ShopCategory category="football"/>}/>
              <Route path='/volleyball' element={<ShopCategory category="volleyball"/>}/>
              <Route path='/hats' element={<ShopCategory category="hats"/>}/>
              <Route path='/product/:productId' element={<Product/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/wishList' element={<WishList/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/edit-profile' element={<EditProfile/>}/>
              <Route path='/my-orders' element={<MyOrders/>}/>
              <Route path="/search-results/:searchValue" element={<SearchResults />} />
            </Routes>
            <Footer/>
          </BrowserRouter>
        </ShopContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
