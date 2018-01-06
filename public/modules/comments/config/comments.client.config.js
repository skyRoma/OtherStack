'use strict';

// Configuring the Articles module
angular.module('comments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Comments', 'comments', 'dropdown', '/comments(/create)?');
		Menus.addSubMenuItem('topbar', 'comments', 'List Comments', 'comments');
		Menus.addSubMenuItem('topbar', 'comments', 'New Comment', 'comments/create');
	}
]);