export const fetchProducts = () => {
  return [
    {
      id: 209,
      name: "New Product",
      sku: [
        { id: 248, selling_price: 54 },
        { id: 247, selling_price: 32 },
        { id: 246, selling_price: 23 },
      ],
    },
   
  ];
};

export const fetchCustomers = () => {
  return [
    {
      id: 11908,
      name: "Ram",
      email: "jesus_christ@church.com",
      location_name: "Mumbai, Maharashtra, India",
    },
   
  ];
};

export const createSaleOrder = async (orderData) => {
 
  console.log('Creating sale order:', orderData);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

