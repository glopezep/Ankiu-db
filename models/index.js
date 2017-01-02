import knexfile from '../lib/knex';

const Category = knexfile.bookshelf.Model.extend({
  tableName: 'categories',
  product: () => this.belongsTo(Product), //eslint-disable-line no-use-before-define
});

const Product = knexfile.bookshelf.Model.extend({
  tableName: 'products',
  category: () => this.hasOne(Category),
});

const Role = knexfile.bookshelf.Model.extend({
  tableName: 'roles',
});

export default {
  Category: knexfile.bookshelf.model('Category', Category),
  Product: knexfile.bookshelf.model('Product', Product),
  Role: knexfile.bookshelf.model('Role', Role),
};
