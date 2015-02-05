var toStr = function(object, tab){
	object = object || this;
	tab = tab || '';
	var key, str = '';
	for (key in object){
		if( !isNaN(parseFloat(key))) {
			str += tab + toStr(object[key], tab + '  ') + '\n';
		} else if (typeof object[key]  == 'object') {
			str += key + ': \n' + toStr(object[key], tab + '  ');
		} else if (key != 'toStr') {
			str += key + ': ' + object[key] + ', ';
		}
	}
	// get rid of the last comma
	return str;
};

// constructors

var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
};

var Drink = function  (name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

var Plate = function  (name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

var Order = function (plates) {
	this.plates = plates;
};

var Menu = function (plates) {
	this.plates = plates;
};

var Restaurant = function (name, description, menu) {
	this.name = name;
	this.description = description;
	this.menu = menu;
};

var Customer = function (dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
};

var constructors = [FoodItem, Drink, Plate, Order, Menu, Restaurant];

constructors.forEach(function(value) {
	value.prototype.toStr = toStr;
});


var tequila = new FoodItem('tequila', 300, true, false, true),
		limeJuice = new FoodItem('lime juice', 100, true, true, false),
		rice = new FoodItem('Rice', 10, true, false, true),
		avocados = new FoodItem('avocados', 50, true, true, true),
		margarita = new Drink('Margarita', 'delicious drink', 10, [tequila, limeJuice]);

var steak = new FoodItem('steak', 1000, false, true, true),
		baguette = new FoodItem('Baguette', 200, true, false, true),
		orange = new FoodItem('orange', 50, true, true, false);

var burrito = new Plate('Burrito', 'Mexican food', 4, [steak, rice]),
		guacamole = new Plate('Guacamole', 'Made from avocados', 10, [avocados, limeJuice]),
		menu = new Menu([burrito, guacamole, margarita]);

var chicos = new Restaurant('Chico\'s', 'The best restaurant in town', menu);



// console.log(steak.toStr());
// console.log(baguette.toStr());
// console.log(orange.toStr());

// console.log(margarita.toStr());
// console.log(burrito.toStr());

// console.log(menu.toStr());
console.log(chicos.toStr());
