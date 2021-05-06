class Validator {
  static isInteger(value) {
    return (value ^ 0) === value;
  }

  static isEmpty(value) {
    if (value === undefined) return true;

    if (
      typeof value == "function" ||
      typeof value == "number" ||
      typeof value == "boolean" ||
      Object.prototype.toString.callvalue === "[object Date]"
    )
      return false;

    if (value == null || value.length === 0) return true;

    if (typeof value == "object" && Object.keys(value).length === 0)
      return true;

    return false;
  }

  static isIn(value, array) {
    return array.includes(value);
  }
}

module.exports = Validator;
