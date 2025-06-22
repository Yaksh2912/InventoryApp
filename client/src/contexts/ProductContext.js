import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      name: 'Alternator',
      stock: 15,
      price: 2500,
      department: 'Electrical',
      salesHistory: [],
      purchaseHistory: []
    },
    {
      name: 'Radiator',
      stock: 8,
      price: 3400,
      department: 'Engine',
      salesHistory: [],
      purchaseHistory: []
    },
    {
      name: 'Shock Absorber',
      stock: 20,
      price: 1900,
      department: 'Suspension',
      salesHistory: [],
      purchaseHistory: []
    }
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
