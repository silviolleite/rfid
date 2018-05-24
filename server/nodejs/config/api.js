const basePath = `http://${process.env.APP_URL}:3000/api/`;

module.exports = {
  endpoints: {
    'users': `${basePath}users/`,
    'tags': `${basePath}tags/`,
    'log': `${basePath}logs/`
  }
}
;
