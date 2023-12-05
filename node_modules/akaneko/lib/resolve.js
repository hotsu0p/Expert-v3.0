const fetch = require("node-fetch");

module.exports = {
  get: async function (params) {
    return fetch(`http://51.161.33.197/api/${params}`)
      .then((res) => res.json())
      .then((json) => {
        return json.url;
      });
  },
};
