const db = require('./db');

const table = 'core_access_log';

const all = () => {
  //return db.all(table);
  const query = 'SELECT l.id, l.status, l.access_type, DATE_FORMAT(l.created_at,\'%d %b %Y %T\') as created_at, u.name as id_user, t.tag as id_tag, k.name as local FROM `core_access_log` as l INNER JOIN core_user as u ON l.user_id = u.id INNER JOIN core_tag as t ON l.tag_id = t.id INNER JOIN core_place as k ON l.place_id = k.id ORDER BY l.created_at DESC LIMIT 5 '
  return db.query(query)
};

const find = (place_id, user_id, tag_id) => {
  const query = `SELECT access_type FROM core_access_log where user_id =${user_id} AND tag_id=${tag_id} AND place_id=${place_id} ORDER BY created_at DESC LIMIT 1`
  return db.query(query);
};

const create = (data) => {
  const query = `INSERT INTO ${table} (user_id, tag_id, status, place_id, access_type) VALUES (${data.user_id}, ${data.tag_id}, ${data.status}, ${data.place_id}, ${data.access_type});`;
  return db.query(query);
};



module.exports = {
  all: all,
  find: find,
  create: create
};
