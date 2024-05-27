
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
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SearchResults from './components/SearchResults/SearchResults';
import Item from './components/Item/Item';
import axios from 'axios';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
<Route path='/' element={<Shop/>}/>
<Route path='/football' element={<ShopCategory category= "football"/>}/>
<Route path='/volleyball' element={<ShopCategory category= "volleyball"/>}/>
<Route path='/hats' element={<ShopCategory category= "hats"/>}/>
<Route path='/product/:productId' element={<Product/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/wishList' element={<WishList/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path="/search-results/:searchValue" element={<SearchResults />} />
</Routes>
<Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
