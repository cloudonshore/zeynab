var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var AppText = new keystone.List('AppText');

AppText.add({
	name: { type: String, required: true },
	text: { type: Types.Html, wysiwyg: true, height: 400 }
});

AppText.register();
