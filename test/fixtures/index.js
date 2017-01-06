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

function getUser(username) {
  return {
    username: username || 'glopezep',
    password: '123456',
  };
}

function getUsers() {
  return [
    getUser('glopezep'),
    getUser('guillermo'),
    getUser('enmanuel'),
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
  getUser,
  getUsers,
  getCategory,
  getCategories,
  getProduct,
};
