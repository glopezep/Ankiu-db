function getRole(name) {
  return {
    name: name || 'Admin',
  };
}

function getRoles() {
  return [
    getRole('Guest'),
    getRole('Random'),
    getRole('User'),
  ];
}

function getCategory(name) {
  return {
    name: name || 'Food',
  };
}

function getCategories() {
  return [
    getCategory('Dessert'),
    getCategory('Juice'),
    getCategory('Fruit'),
  ];
}

function getProduct(name) {
  return {
    name: name || 'Orange Juice',
    price: 120,
    currency: 'RD$',
  };
}

export default {
  getRole,
  getRoles,
  getCategory,
  getCategories,
  getProduct,
};
