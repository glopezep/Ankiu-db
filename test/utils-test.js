import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies
import 'babel-polyfill';
import 'babel-register';
import utils from '../lib/utils';

test('Encrypt password', (t) => {
  const password = '123456';
  const encrypted = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

  const result = utils.encrypt(password);
  t.is(result, encrypted);
});
