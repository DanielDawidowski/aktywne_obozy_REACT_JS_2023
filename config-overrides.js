const { aliasWebpack, aliasJest } = require("react-app-alias");

const aliasMap = {
  "@components": "src/components",
  "@service": "src/services",
  "@hooks": "src/hooks",
  "@pages": "src/pages",
  "@mocks": "src/mocks",
  "@assets": "src/assets",
  "@redux": "src/redux-toolkit",
  "@sass": "src/sass",
  "@root": "src"
};

const options = {
  alias: aliasMap
};

module.exports = aliasWebpack(options);
module.exports.jest = aliasJest(options);
