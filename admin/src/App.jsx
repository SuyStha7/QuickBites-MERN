import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./pages/AddProduct/Product";
import Category from "./pages/AddCategory/Category";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route
            path='/addCat'
            element={<Category url={url} />}
          />
          <Route
            path='/addProd'
            element={<Product url={url} />}
          />
          <Route
            path='/updateProd/:id'
            element={<UpdateProduct url={url} />}
          />
          <Route
            path='/list'
            element={<List url={url} />}
          />
          <Route
            path='/orders'
            element={<Orders url={url} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
