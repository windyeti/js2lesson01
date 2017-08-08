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
	if(this.elem) this.elem.parentNode.removeChild(this.elem);
};
function Menu(menu_items) {
	Container.call(this);
	this.menu_items = menu_items;
};
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
	let result = '<ul id=' + this.id + ' class=' + this.className + '>';
	for(let key in this.menu_items) {
		if(this.menu_items[key] instanceof MenuItem) {
			result += this.menu_items[key].render();
		} else if(this.menu_items[key] instanceof Menu) {
			result += '<li>' + this.menu_items[key].render() + '</li>';
		}

	};
	return result += '</ul>';
};
function MenuItem(item_name) {
	Container.call(this);
	this.item_name = item_name;
};
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {
	return '<li class='+ this.menuItem_className +' href='+ this.menuItem_href +'>' + this.item_name + '</li>';
};
function rendorMenu(xhr) {
	let items = {};
	for(let key in xhr) {
		console.log(typeof xhr[key]);
		if(typeof xhr[key] == 'object') {
			// let subMenu = rendorMenu(xhr[key]);
			items[key] = new Menu( rendorMenu(xhr[key]) );
		} else {
			items[key] = new MenuItem( xhr[key] );
		};
	};
	return items;
};
let options = {
	0 : 'Каталог',
	1 : 'Люди',
	2 : {
		0 : 'Персоны',
		1 : 'CEO',
		2 : 'Employers',
		3 : {
			0 : 'трудяги',
			1 : 'тунеядцы'
		}
	},
	3 : 'Носки'
}
var result = rendorMenu(options);

let menu = new Menu(result);
document.body.innerHTML = menu.render();



