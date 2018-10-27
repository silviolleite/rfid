const db = require('./db');

const table = 'core_access_log';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const create = (data) => {
  const query = `INSERT INTO ${table} (user_id, tag_id, status) VALUES (${data.user_id}, ${data.tag_id}, ${data.status});`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

module.exports = {
  all: all,
  find: find,
  create: create,
  remove: remove
};
