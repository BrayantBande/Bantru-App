import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Crear Categoria
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Crear Producto
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Productos
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Pedidos
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
