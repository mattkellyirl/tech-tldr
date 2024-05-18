const dayjs = require("dayjs");

module.exports = {
  formatDate: (date) => {
    return dayjs(date).format("dddd, MMMM DD YYYY");
  },
};
