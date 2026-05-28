
//Complete this component that renders a list of products. Add a search input 
// that filters the list in real time as the user types (case insensitive).
//The component should still filter the products whether the user filter 
// by the product_name or it’s description .
//The UI is already handled just focus on the logic and codes related to filtering.



{/* ___Trial__
  
  const ProductList = () => {
  const filteredProducts = products;
  const [items, setItems]= useState('');
  
  function handleInput(){
const currentItem= filteredProducts.filter(product=> product=== products.product_name || product=== products.description )
if (currentItem){
    return setItems(currentItem)
}
setItems(e.target.value)
  }



  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
        onChange={handleInput}
        // value={items}
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.product_id}
              className="p-3 border rounded shadow-sm"
            >
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

 export default ProductList;*/}


import { useState } from "react";


const products = [
  {
    product_id: 1,
    product_name: "Laptop",
    price: 1200,
    description: "High-performance laptop with 16GB RAM and 512GB SSD.",
  },
  {
    product_id: 2,
    product_name: "Smartphone",
    price: 800,
    description: "Latest smartphone with OLED display and 5G connectivity.",
  },
  {
    product_id: 3,
    product_name: "Headphones",
    price: 150,
    description: "Noise-cancelling wireless headphones with long battery life.",
  },
  {
    product_id: 4,
    product_name: "Keyboard",
    price: 60,
    description: "Mechanical keyboard with customizable RGB lighting.",
  },
  {
    product_id: 5,
    product_name: "Mouse",
    price: 40,
    description: "Wireless ergonomic mouse with adjustable DPI.",
  },
  {
    product_id: 6,
    product_name: "Monitor",
    price: 300,
    description: "27-inch 4K UHD monitor with HDR support.",
  },
  {
    product_id: 7,
    product_name: "Printer",
    price: 200,
    description: "All-in-one inkjet printer with wireless printing.",
  },
  {
    product_id: 8,
    product_name: "Tablet",
    price: 500,
    description: "10-inch tablet with stylus support and 128GB storage.",
  },
  {
    product_id: 9,
    product_name: "Smartwatch",
    price: 250,
    description: "Water-resistant smartwatch with fitness tracking features.",
  },
  {
    product_id: 10,
    product_name: "External Hard Drive",
    price: 100,
    description: "1TB portable hard drive with USB 3.0 connectivity.",
  },
];

const ProductList = () => {
  // 2. ONE state for the search query string only
  const [query, setQuery] = useState("");

  // 3. Derive filteredProducts on every render from `products` + `query`
  //    No need for a second state — this is just a variable
  const filteredProducts = products.filter((product) => {
    const search = query.toLowerCase();
    return (
      product.product_name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  });

  // 4. handleInput receives the event `e`, and only updates the query string
  function handleInput(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
        onChange={handleInput}
        value={query}  // 5. Always bind value to your state
      />

      {filteredProducts.length > 0 ? (
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li key={product.product_id} className="p-3 border rounded shadow-sm">
              <h2 className="font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-medium">${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;