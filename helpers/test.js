module.exports = function (param) {
  return 'Hello ' + param.data.root.query.name + param.data.root.query.suffix;
};
