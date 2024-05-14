import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import axios from "axios";


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dummyData = [
          {
            "id": 1,
            "name": "Product 1",
            "description": "This is a sample product description.",
            "price": 19.99,
            "category": "Electronics",
            "inventory": 25,
            "sales": 100
          },
          {
            "id": 2,
            "name": "Product 2",
            "description": "Another sample product description.",
            "price": 29.99,
            "category": "Clothing",
            "inventory": 15,
            "sales": 80
          },
          {
            "id": 3,
            "name": "Product 3",
            "description": "Yet another sample product description.",
            "price": 14.99,
            "category": "Books",
            "inventory": 0,
            "sales": 120
          },
          {
            "id": 4,
            "name": "Product 4",
            "description": "This is a different sample product description.",
            "price": 39.99,
            "category": "Electronics",
            "inventory": 10,
            "sales": 50
          }
        ];

        setProducts(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProduct = async () => {
    try {
      // Placeholder for adding product using API
      console.log("New product data:", newProductData);
      setShowAddProductModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="main-page">
      <h2>Product Page</h2>
      <div className="filters">
        <label htmlFor="typeFilter">Type:</label>
        <select
          id="typeFilter"
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">All</option>
          <option value="electronic">Electronic</option>
          <option value="clothing">Clothing</option>
        </select>

        <label htmlFor="categoryFilter">Category:</label>
        <select
          id="categoryFilter"
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="accessories">Accessories</option>
          <option value="appliances">Appliances</option>
        </select>
      </div>

      <button onClick={() => setShowAddProductModal(true)}>Add</button>

      {showAddProductModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowAddProductModal(false)}
            >
              &times;
            </span>
            <h3>Add New Product</h3>
            <form>
              <label>Name:</label>
              <input type="text" name="name" onChange={handleInputChange} />
              <label>Description:</label>
              <input
                type="text"
                name="description"
                onChange={handleInputChange}
              />
              <label>Price:</label>
              <input type="number" name="price" onChange={handleInputChange} />
              <label>Inventory:</label>
              <input
                type="number"
                name="inventory"
                onChange={handleInputChange}
              />
              <label>Sales:</label>
              <input type="number" name="sales" onChange={handleInputChange} />
              <label>Type:</label>
              <input type="text" name="type" onChange={handleInputChange} />
              <label>Category:</label>
              <input type="text" name="category" onChange={handleInputChange} />
              <button type="button" onClick={addProduct}>
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Inventory: {product.inventory}</p>
              <p>Sales: {product.sales}</p>
              <p>Type: {product.type}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
