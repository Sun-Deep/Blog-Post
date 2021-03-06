export default (field) => {
  return function (next) {
    this.populate(field);
    next();
  };
};
