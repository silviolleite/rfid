const basePath = `http://${process.env.APP_URL}:3000/api/`;

module.exports = {
  endpoints: {
    'tags': `${basePath}tags/`,
    'log': `${basePath}logs/`
  }
}
;
