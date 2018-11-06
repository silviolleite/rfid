const db = require('./db');

const table = 'core_access_log';

const all = () => {
  //return db.all(table);
  const query = 'SELECT l.id, l.status, DATE_FORMAT(l.created_at,\'%d %b %Y %T\') as created_at, u.name as id_user, t.tag as id_tag FROM `core_access_log` as l INNER JOIN core_user as u ON l.user_id = u.id INNER JOIN core_tag as t ON l.tag_id = t.id ORDER BY l.created_at DESC LIMIT 5'
  return db.query(query)
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
