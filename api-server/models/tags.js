const db = require('./db');

const table = 'core_tag';

const searchByTag = (tag, place) => {
  return db.query(`SELECT t.id, t.tag, t.user_id, t.state, p.place_id, (SELECT access_type FROM core_access_log where user_id =t.user_id AND tag_id=t.id AND place_id=p.place_id ORDER BY created_at DESC LIMIT 1) as access  FROM ${table} t, core_tag_places as p WHERE tag = '${tag}' AND p.tag_id = t.id AND p.place_id = '${place}'`)
};


module.exports = {
  searchByTag: searchByTag,
};
