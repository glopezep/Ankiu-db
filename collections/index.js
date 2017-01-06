import knexfile from '../lib/knex';
import models from '../models';

const Categories = knexfile.bookshelf.Collection.extend({
  model: models.Category,
});

const Products = knexfile.bookshelf.Collection.extend({
  model: models.Product,
});

const Roles = knexfile.bookshelf.Collection.extend({
  model: models.Role,
});

const Users = knexfile.bookshelf.Collection.extend({
  model: models.User,
});

export default {
  Categories: knexfile.bookshelf.collection('Categories', Categories),
  Products: knexfile.bookshelf.collection('Products', Products),
  Roles: knexfile.bookshelf.collection('Roles', Roles),
  Users: knexfile.bookshelf.collection('Users', Users),
};
