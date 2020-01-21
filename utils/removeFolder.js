const fs = require("fs-extra");

module.exports = async folder => {
  try {
    await fs.remove(folder);
  } catch (err) {
    console.error(err);
  }
};
