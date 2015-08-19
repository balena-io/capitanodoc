var _, ent;

_ = require('lodash');

ent = require('ent');

exports.getOptionPrefix = function(signature) {
  if (signature.length > 1) {
    return '--';
  } else {
    return '-';
  }
};

exports.getOptionSignature = function(signature) {
  return "" + (exports.getOptionPrefix(signature)) + signature;
};

exports.parseSignature = function(option) {
  var alias, i, len, ref, result;
  result = exports.getOptionSignature(option.signature);
  if (!_.isEmpty(option.alias)) {
    if (_.isString(option.alias)) {
      result += ", " + (exports.getOptionSignature(option.alias));
    } else {
      ref = option.alias;
      for (i = 0, len = ref.length; i < len; i++) {
        alias = ref[i];
        result += ", " + (exports.getOptionSignature(option.alias));
      }
    }
  }
  if (option.parameter != null) {
    result += " <" + option.parameter + ">";
  }
  return ent.encode(result);
};
