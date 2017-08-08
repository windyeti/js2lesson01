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

// let itemSub00 = new MenuItem('/people.html', 'people', 'Люди');
// let itemSub01 = new MenuItem('/history.html', 'history', 'История');
// let itemSub02 = new MenuItem('/factory.html', 'factory', 'Заводы');

// let item00 = new MenuItem('/', 'mainPage', 'Главная');
// let item01 = new MenuItem('/about.html', 'aboutPage', 'О компании');
// let item02 = new Menu('#about', 'aboutPage', { 0: itemSub00, 1: itemSub01, 2: itemSub02 });
// let item03 = new MenuItem('/product.html', 'product', 'Продукт');

// let menu = new Menu('#myMenu', 'myMenuClass', {0 : item00, 1 : item01, 2 : item02, 3 : item03});

let item4_0 = new MenuItem('/oldSocks.html','oldSocks','Старые');
let item4_1 = new MenuItem('/newSocks.html','newSocks','Новые');
let menu3_0 = new Menu('/oldnew.html','oldnew', {0:item4_0, 1:item4_1});

let item3_0 = new MenuItem('/crossSocks.html','crossSocks','Вязанные');
let item3_1 = new MenuItem('/cotonSocks.html','cotonSocks','Трикотажные');
let item3_2 = new MenuItem('/holeSocks.html','holeSocks','С дыркйой');
let menu2_0 = new Menu('/socks.html','socks', {0:item3_0, 1:item3_1, 2:item3_2, 3:menu3_0});

let item2_0 = new MenuItem('/Socks.html','Socks','Носки');
let item2_1 = new MenuItem('/tie.html','tie','Галстуки');
let item2_2 = new MenuItem('/pants.html','pants','Брюки');

let item3_3 = new MenuItem('/female.html','female','Женские');
let item3_4 = new MenuItem('/male.html','male','Мужские');
let menu2_1 = new Menu('/pants.html','pants', {0:item3_3, 1:item3_4});

let menu1_0 = new Menu('/product.html','product', {0:item2_0, 1:menu2_0, 2:item2_1, 3:item2_2, 4:menu2_1});

let item1_0 = new MenuItem('/catalog.html','catalog','Каталог');
let item1_1 = new MenuItem('/private.html','private','Личный кабинет');
let item1_2 = new MenuItem('/basket.html','basket','Корзина');

let menu = new Menu('#myMenu', 'myMenuClass', {0 : item1_0, 1 : menu1_0, 2 : item1_1, 3 : item1_2});

document.body.innerHTML = menu.render();

// setTimeout(function() {
// 	menu.remove();
// }, 2000)



