import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/addCat' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Category</p>
        </NavLink>

        <NavLink to='/addProd' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Products</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
