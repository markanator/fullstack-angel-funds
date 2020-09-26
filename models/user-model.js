/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const db = require('../../database/config');

const findById = (id) =>
  db('users')
    .select(
      'id',
      'username',
      'email',
      'userRole',
      'dateCreated',
      'avatarUrl',
      'address_street',
      'address_city',
      'address_state',
      'address_zip',
      'address_country',
      'firstName',
      'lastName'
    )
    .where({ id })
    .first();

const findByEmail = (email) => db('users').select('*').where({ email }).first();

const findByUsername = (username) =>
  db('users')
    .select(
      'id',
      'username',
      'email',
      'userRole',
      'dateCreated',
      'avatarUrl',
      'address_street',
      'address_city',
      'address_state',
      'address_zip',
      'address_country',
      'firstName',
      'lastName'
    )
    .where({ username })
    .first();

const insert = async (user) => {
  try {
    const [res] = await db('users').insert(user).returning('id');
    // console.log('## added USER', res);
    return findById(res);
  } catch (error) {
    console.log(error);
  }
};

const update = async (user, id) => {
  await db('users').update(user).where({ id }).select('*');
  return findById(id);
};

const remove = (id) => db('users').delete().where({ id });

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove,
};
