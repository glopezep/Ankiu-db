import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies
import 'babel-polyfill';
import 'babel-register';
import AnkiuDb from '../lib/db';
import fixtures from './fixtures';

test.before('Setup database', async (t) => {
  await AnkiuDb.dropTables();
  t.is(typeof AnkiuDb.setup, 'function', 'Should be a function');
  await AnkiuDb.setup();
});

test('Save Role', async (t) => {
  t.is(typeof AnkiuDb.saveRole, 'function', 'Should be a function');

  const role = fixtures.getRole();
  const created = await AnkiuDb.saveRole(role);

  t.is(typeof created.get('id'), 'number');
  t.is(typeof created.get('name'), 'string');
  t.is(created.get('name'), role.name);
});

test('Get a Role', async (t) => {
  t.is(typeof AnkiuDb.getRole, 'function', 'Should be a function');
  const role = fixtures.getRole();
  const created = await AnkiuDb.saveRole(role);
  const result = await AnkiuDb.getRole(created.get('id'));

  t.is(result.get('id'), created.get('id'));
  t.is(result.get('name'), created.get('name'));
});

test('Get Roles', async (t) => {
  t.is(typeof AnkiuDb.getRoles, 'function', 'Should be a function');

  const roles = fixtures.getRoles();
  const saveRoles = roles.map(role => AnkiuDb.saveRole(role));
  await Promise.all(saveRoles);
  const result = await AnkiuDb.getRoles();

  t.truthy(result.length);
});

test('Update Role', async (t) => {
  t.is(typeof AnkiuDb.updateRole, 'function', 'Should be a function');

  const role = fixtures.getRole();
  let created = await AnkiuDb.saveRole(role);
  created = created.toJSON();
  created.name = 'Guest';
  const result = await AnkiuDb.updateRole(created.id, created);

  t.is(result.get('id'), created.id);
  t.is(result.get('name'), created.name);
});

test('Delete a rol', async (t) => {
  t.is(typeof AnkiuDb.deleteRole, 'function', 'Should be a function');
  const role = fixtures.getRole();
  let created = await AnkiuDb.saveRole(role);
  created = created.toJSON();
  const result = await AnkiuDb.deleteRole(created.id);

  t.not(result.get('id'), created.id);
  t.not(result.get('name'), created.name);
});

test('Save a category', async (t) => {
  t.is(typeof AnkiuDb.saveCategory, 'function', 'Should be a function');

  const category = fixtures.getCategory();
  let created = await AnkiuDb.saveCategory(category);
  created = created.toJSON();
  t.truthy(created.id);
  t.is(created.name, category.name);
});

test('Get a category', async (t) => {
  t.is(typeof AnkiuDb.getCategory, 'function', 'Should be a functiion');

  const category = fixtures.getCategory();
  let created = await AnkiuDb.saveCategory(category);
  created = created.toJSON();
  let result = await AnkiuDb.getCategory(created.id);
  result = result.toJSON();

  t.is(result.id, created.id);
  t.is(result.name, created.name);
});

test('Get categories', async (t) => {
  t.is(typeof AnkiuDb.getCategories, 'function', 'Should be a function');

  const categories = fixtures.getCategories();
  const saveCategories = categories.map(category => AnkiuDb.saveCategory(category));
  await Promise.all(saveCategories);
  const result = await AnkiuDb.getCategories();

  t.truthy(result.length);
});

test('Update category', async (t) => {
  t.is(typeof AnkiuDb.updateCategory, 'function', 'Should be a function');

  const category = fixtures.getCategory();
  let created = await AnkiuDb.saveCategory(category);
  created = created.toJSON();
  created.name = 'Dessert';
  let result = await AnkiuDb.updateCategory(created.id, created);
  result = result.toJSON();

  t.is(result.id, created.id);
  t.is(result.name, created.name);
});

test('Delete a category', async (t) => {
  t.is(typeof AnkiuDb.deleteCategory, 'function', 'Should be a function');
  const category = fixtures.getCategory();
  let created = await AnkiuDb.saveCategory(category);
  created = created.toJSON();
  const result = await AnkiuDb.deleteCategory(created.id);

  t.not(result.get('id'), created.id);
  t.not(result.get('name'), created.name);
});

test('Save a product', async (t) => {
  t.is(typeof AnkiuDb.saveProduct, 'function', 'Should be a function');

  const category = fixtures.getCategory();
  let createdCategory = await AnkiuDb.saveCategory(category);
  createdCategory = createdCategory.toJSON();

  const product = fixtures.getProduct();
  product.category_id = createdCategory.id;
  let createdProduct = await AnkiuDb.saveProduct(product);
  createdProduct = createdProduct.toJSON();

  t.truthy(createdProduct.id);
  t.is(createdProduct.name, product.name);
  t.is(createdProduct.price, product.price);
  t.is(createdProduct.currency, product.currency);
  t.is(createdProduct.category_id, product.category_id);
});

test('Get a product by id', async (t) => {
  t.is(typeof AnkiuDb.getProduct, 'function', 'Should be a function');

  const category = fixtures.getCategory();
  let createdCategory = await AnkiuDb.saveCategory(category);
  createdCategory = createdCategory.toJSON();

  const product = fixtures.getProduct();
  product.category_id = createdCategory.id;
  let createdProduct = await AnkiuDb.saveProduct(product);
  createdProduct = createdProduct.toJSON();

  let result = await AnkiuDb.getProduct(createdProduct.id);
  result = result.toJSON();

  t.is(result.id, createdProduct.id);
  t.is(result.name, createdProduct.name);
  t.is(result.price, createdProduct.price);
  t.is(result.currency, createdProduct.currency);
  t.is(result.category_id, createdProduct.category_id);
});

test('Update a product', async (t) => {
  const category = fixtures.getCategory();
  let createdCategory = await AnkiuDb.saveCategory(category);
  createdCategory = createdCategory.toJSON();

  const product = fixtures.getProduct();
  product.category_id = createdCategory.id;
  let createdProduct = await AnkiuDb.saveProduct(product);
  createdProduct = createdProduct.toJSON();

  createdProduct.name = 'Apple Juice';
  createdProduct.price = 500;
  createdProduct.currency = 'USD$';
  let result = await AnkiuDb.updateProduct(createdProduct.id, createdProduct);
  result = result.toJSON();

  t.is(result.id, createdProduct.id);
  t.is(result.name, createdProduct.name);
  t.is(result.price, createdProduct.price);
  t.is(result.currency, createdProduct.currency);
  t.is(result.category_id, createdProduct.category_id);
});

test.todo('Delete a product');

test.after('Clean up database', async (t) => {
  t.is(typeof AnkiuDb.dropTables, 'function', 'Should be a function');
  await AnkiuDb.dropTables();
});
