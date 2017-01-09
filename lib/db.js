import Promise from 'bluebird';
import knexfile from './knex';
import models from '../models';
import collections from '../collections';
import utils from './utils';

class Db {
  static async saveRole(role, callback) {
    try {
      const created = await new models.Role(role).save();
      return Promise.resolve(created).asCallback(callback);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getRole(id, callback) {
    try {
      const role = await models.Role.where({ id }).fetch();
      if (!role) throw new Error('Role not found');
      return Promise.resolve(role).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async getRoles(callback) {
    try {
      const roles = await new collections.Roles().fetch();
      return Promise.resolve(roles).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async updateRole(id, data, callback) {
    try {
      const role = await this.getRole(id);
      const result = await role.save({
        name: data.name || role.get('name'),
      });
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async deleteRole(id, callback) {
    try {
      const role = await this.getRole(id);
      const result = await role.destroy();
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async saveUser(user, callback) {
    try {
      const newUser = user;
      newUser.password = utils.encrypt(newUser.password);
      const created = await new models.User(newUser).save();
      return Promise.resolve(created).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async getUser(id, callback) {
    try {
      const result = await models.User.where({ id }).fetch({ withRelated: ['role'] });
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async getUsers(callback) {
    try {
      const users = await collections.Users.where().fetch();
      return Promise.resolve(users).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async saveCategory(category, callback) {
    try {
      const created = await new models.Category(category).save();
      return Promise.resolve(created).asCallback(callback);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getCategory(id, callback) {
    try {
      const category = await models.Category.where({ id }).fetch();
      return Promise.resolve(category).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async getCategories(callback) {
    try {
      const categories = await new collections.Categories().fetch();
      return Promise.resolve(categories).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async updateCategory(id, data, callback) {
    try {
      const category = await this.getCategory(id);
      const result = await category.save({
        name: data.name || category.get('name'),
      });
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async deleteCategory(id, callback) {
    try {
      const category = await this.getRole(id);
      const result = await category.destroy();
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async saveProduct(product, callback) {
    try {
      const created = await new models.Product(product).save();
      return Promise.resolve(created);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async getProduct(id, callback) {
    try {
      const product = await models.Product.where({ id }).fetch({ withRelated: ['category'] });
      return Promise.resolve(product).asCallback(callback);
    } catch (e) {
      return Promise.resolve(e).asCallback(callback);
    }
  }

  static async updateProduct(id, data, callback) {
    try {
      const product = await this.getProduct(id);
      const result = await product.save({
        name: data.name || product.get('name'),
        price: data.price || product.get('price'),
        currency: data.currency || product.get('currency'),
        category_id: data.category_id || product.get('category_id'),
      });
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async deleteProduct(id, callback) {
    try {
      const product = await this.getProduct(id);
      const result = await product.destroy();
      return Promise.resolve(result).asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }

  static async setup(callback) {
    try {
      await knexfile.knex.schema.createTableIfNotExists('categories', (table) => {
        table.increments('id').primary();
        table.string('name');
      });

      await knexfile.knex.schema.createTableIfNotExists('products', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.integer('price');
        table.string('currency');
        table.integer('category_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('categories');
      });

      await knexfile.knex.schema.createTableIfNotExists('invoices', (table) => {
        table.increments('id').primary();
        table.integer('total');
        table.integer('product_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('products');
      });

      await knexfile.knex.schema.createTableIfNotExists('order_states', (table) => {
        table.increments('id').primary();
        table.string('name');
      });

      await knexfile.knex.schema.createTableIfNotExists('orders', (table) => {
        table.increments('id').primary();
        table.integer('order_state_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('order_states');
        table.integer('invoice_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('invoices');
      });

      await knexfile.knex.schema.createTableIfNotExists('roles', (table) => {
        table.increments('id').primary();
        table.string('name');
      });

      await knexfile.knex.schema.createTableIfNotExists('users', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('password');
        table.integer('role_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('roles');
      });

      return Promise.resolve('Setup completed.').asCallback(callback);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async dropTables(callback) {
    try {
      await knexfile.knex.schema.dropTableIfExists('users');
      await knexfile.knex.schema.dropTableIfExists('roles');
      await knexfile.knex.schema.dropTableIfExists('orders');
      await knexfile.knex.schema.dropTableIfExists('order_states');
      await knexfile.knex.schema.dropTableIfExists('invoices');
      await knexfile.knex.schema.dropTableIfExists('products');
      await knexfile.knex.schema.dropTableIfExists('categories');
      return Promise.resolve('All tables deleted.').asCallback(callback);
    } catch (e) {
      return Promise.reject(e).asCallback(callback);
    }
  }
}
export default Db;
