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
		} else if(this.menu_items[key] instanceof Menu) {
			result += '<li>' + this.menu_items[key].render() + '</li>';
		}

	};
	return result += '</ul>';
};
function MenuItem(menuItem_href, menuItem_className, item_name, submenu) {
	Container.call(this);
	this.menuItem_href = menuItem_href;
	this.menuItem_className = menuItem_className;
	this.item_name = item_name;
};
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
	return '<li class='+ this.menuItem_className +' href='+ this.menuItem_href +'>' + this.item_name + '</li>';
};

let itemSub00 = new MenuItem('/people.html', 'people', 'Люди');
let itemSub01 = new MenuItem('/history.html', 'history', 'История');
let itemSub02 = new MenuItem('/factory.html', 'factory', 'Заводы');

let item00 = new MenuItem('/', 'mainPage', 'Главная');
let item01 = new MenuItem('/about.html', 'aboutPage', 'О компании');
let item02 = new Menu('#about', 'aboutPage', { 0: itemSub00, 1: itemSub01, 2: itemSub02 });
let item03 = new MenuItem('/product.html', 'product', 'Продукт');

let menu = new Menu('#myMenu', 'myMenuClass', {0 : item00, 1 : item01, 2 : item02, 3 : item03});

document.body.innerHTML = menu.render();

// setTimeout(function() {
// 	menu.remove();
// }, 2000)



