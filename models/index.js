import knexfile from '../lib/knex';

const Category = knexfile.bookshelf.Model.extend({
  tableName: 'categories',
  products() {
    return this.belongsToMany(Product, 'id'); // eslint-disable-line no-use-before-define
  },
});

const Product = knexfile.bookshelf.Model.extend({
  tableName: 'products',
  category() {
    return this.hasOne(Category, 'id');
  },
});

const Role = knexfile.bookshelf.Model.extend({
  tableName: 'roles',
});

export default {
  Category: knexfile.bookshelf.model('Category', Category),
  Product: knexfile.bookshelf.model('Product', Product),
  Role: knexfile.bookshelf.model('Role', Role),
};
