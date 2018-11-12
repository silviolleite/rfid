const db = require('./db');

const table = 'core_tag';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const searchByTag = (tag, place) => {
  return db.query(`SELECT t.id, t.tag, t.user_id, t.state, p.place_id  FROM ${table} t, core_tag_places as p WHERE tag = '${tag}' AND p.tag_id = t.id AND p.place_id = '${place}'`)
};

const create = (data) => {
  const query = `INSERT INTO ${table} (user_id, tag) VALUES (1, '${data.tag}');`;

  return db.query(query);
};

const update = (id, data) => {
  const query = `UPDATE ${table} SET tag = '${data.tag}', state = ${data.state} WHERE id = ${id};`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

module.exports = {
  all: all,
  find: find,
  searchByTag: searchByTag,
  create: create,
  update: update,
  remove: remove
};
