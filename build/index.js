var _, markdown, path;

_ = require('lodash');

path = require('path');

markdown = require('./markdown');

exports.getDocumentation = function(capitanodoc) {
  var actionCommand, actionName, actions, category, commandCategory, file, i, j, len, len1, ref, ref1, result;
  result = {};
  result.title = capitanodoc.title;
  result.introduction = capitanodoc.introduction;
  result.categories = [];
  ref = capitanodoc.categories;
  for (i = 0, len = ref.length; i < len; i++) {
    commandCategory = ref[i];
    category = {};
    category.title = commandCategory.title;
    category.commands = [];
    ref1 = commandCategory.files;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      file = ref1[j];
      actions = require(path.join(process.cwd(), file));
      if (actions.signature != null) {
        category.commands.push(_.omit(actions, 'action'));
      } else {
        for (actionName in actions) {
          actionCommand = actions[actionName];
          category.commands.push(_.omit(actionCommand, 'action'));
        }
      }
    }
    result.categories.push(category);
  }
  result.toc = _.cloneDeep(result.categories);
  result.toc = _.map(result.toc, function(category) {
    category.commands = _.map(category.commands, function(command) {
      return {
        signature: command.signature,
        anchor: '#' + command.signature.replace(/\s/g, '-').replace(/</g, '60-').replace(/>/g, '-62-').replace(/\[/g, '').replace(/\]/g, '-').replace(/--/g, '-').replace(/\.\.\./g, '').replace(/\|/g, '').toLowerCase()
      };
    });
    return category;
  });
  return markdown.display(result);
};
