import Knex from 'knex';
import Bookshelf from 'bookshelf';
import config from '../config';

const knex = Knex(config);
const bookshelf = Bookshelf(knex);

bookshelf.plugin('registry');

export default {
  knex,
  bookshelf,
};
