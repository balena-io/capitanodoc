var _, ent, utils;

_ = require('lodash');

ent = require('ent');

utils = require('./utils');

exports.command = function(command) {
  var i, len, option, ref, result;
  result = "## " + (ent.encode(command.signature)) + "\n\n" + command.help + "\n";
  if (!_.isEmpty(command.options)) {
    result += '\n### Options';
    ref = command.options;
    for (i = 0, len = ref.length; i < len; i++) {
      option = ref[i];
      result += "\n\n#### " + (utils.parseSignature(option)) + "\n\n" + option.description;
    }
    result += '\n';
  }
  return result;
};

exports.category = function(category) {
  var command, i, len, ref, result;
  result = "# " + category.title + "\n";
  ref = category.commands;
  for (i = 0, len = ref.length; i < len; i++) {
    command = ref[i];
    result += '\n' + exports.command(command);
  }
  return result;
};

exports.toc = function(toc) {
  var category, command, i, j, len, len1, ref, result;
  result = '# Table of contents\n';
  for (i = 0, len = toc.length; i < len; i++) {
    category = toc[i];
    result += "\n- " + category.title + "\n\n";
    ref = category.commands;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      command = ref[j];
      result += "\t- [" + (ent.encode(command.signature)) + "](" + command.anchor + ")\n";
    }
  }
  return result;
};

exports.display = function(doc) {
  var category, i, len, ref, result;
  result = "# " + doc.title + "\n\n" + doc.introduction + "\n\n" + (exports.toc(doc.toc));
  ref = doc.categories;
  for (i = 0, len = ref.length; i < len; i++) {
    category = ref[i];
    result += '\n' + exports.category(category);
  }
  return result;
};
