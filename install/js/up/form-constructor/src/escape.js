export function escape(string) {
	const htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	};

	return string.replace(/[&<>"']/g, function(match) {
		return htmlEscapes[match];
	});
};