'use string';
function Container() {
	this.id = '';
	this.className = '';
	this.htmlResult = 'проверка обращения';
};
Container.prototype.render = function() {
	return this.htmlResult;
};
Container.prototype.proba = 'proba';
Container.prototype.remove = function() {
	if( !this.id ) {
		console.log('у этого элемента нет id');
		return
	}
	this.elem = document.getElementById(this.id);
	this.elem.parentNode.removeChild(this.elem);
};
function Menu(menu_id, menu_className, menu_items) {
	Container.call(this);
	this.id = menu_id;
	this.className = menu_className;
	this.menu_items = menu_items;
};
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
	let result = '';
	result = '<ul id=' + this.id + ' class=' + this.className + '>';
	for(let key in this.menu_items) {
		if(this.menu_items[key] instanceof MenuItem) {
			result += this.menu_items[key].render();
		}
	};
	return result += '</ul>';
};
function MenuItem(menuItem_href, menuItem_className, item_name, submenu) {
	Container.call(this);
	this.menuItem_href = menuItem_href;
	this.menuItem_className = menuItem_className;
	this.item_name = item_name;
	this.submenu = submenu;
};
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
	if(this.submenu) {
		this.MenuSubMenu = new Menu('','', this.submenu);
		console.log(this.MenuSubMenu);
	}
	return '<li class='+ this.menuItem_className +' href='+ this.menuItem_href +'>' + this.item_name + this.MenuSubMenu.render() + '</li>';
};

let itemSub00 = new MenuItem('/people.html', 'people', 'Люди');
let itemSub01 = new MenuItem('/history.html', 'history', 'История');
let itemSub02 = new MenuItem('/factory.html', 'factory', 'Заводы');

let item01 = new MenuItem('/', 'mainPage', 'Главная');
let item02 = new MenuItem('/about.html', 'aboutPage', 'О компании', { 0: itemSub00, 1: itemSub01, 2: itemSub02 });

let menu = new Menu('#myMenu', 'myMenuClass', {0 : item01, 1 : item02});

document.body.innerHTML = menu.render();

setTimeout(function() {
	item02.remove();
}, 2000)



