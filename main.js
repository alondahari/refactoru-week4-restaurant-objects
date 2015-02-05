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

var create = function() {
	var name = this.name || '';
	var price = this.price || 0;
	var p = $("<p>").text(name)
		.attr('price', price);
	var $this = $("<div>")
		.addClass(this.class)
		.prepend(p);

	for (key in this){
		if (!(this[key] instanceof Function) && this[key] instanceof Object) {
			if (this[key] instanceof Array) {
				this[key].forEach(function(val){
					$this.append(val.create());
				})
			} else {
				$this.append(this[key].create());
			}
		};
	}
	return $this;

}

// constructors

var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
	this.class = 'food-item'
};

var Drink = function  (name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.class = 'drink'
};

var Plate = function  (name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
	this.class = 'plate'
};

var Order = function (plates) {
	this.plates = plates;
	this.class = 'order'
};

var Menu = function (plates) {
	this.plates = plates;
	this.class = 'menu'
};

var Restaurant = function (name, description, menu) {
	this.name = name;
	this.description = description;
	this.menu = menu;
	this.class = 'restaurant'
};

var Customer = function (dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
	this.class = 'customer'
};

var constructors = [FoodItem, Drink, Plate, Order, Menu, Restaurant];

constructors.forEach(function(value) {
	value.prototype.toStr = toStr;
	value.prototype.create = create;
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

var order = new Order();

var chicos = new Restaurant('Chico\'s', 'The best restaurant in town', menu);

$(document).on("ready", function() {
	var $order = order.create();
	var $restaurant = chicos.create().append($order);
	$order.append('<h6 class="total">Your Total:</h6>')
	$("body").append($restaurant);

	$('.menu').on('click', '.plate, .drink', function(){
		$(this).children('p').clone().prependTo($order);
		var total = Array.prototype.reduce.call($order.children('p'), function(mem, val){
			return mem + parseFloat($(val).attr('price'));
		}, 0);
		$('.total').text('Your Total: $' + total )
	})

});

// console.log(steak.toStr());
// console.log(baguette.toStr());
// console.log(orange.toStr());

// console.log(margarita.toStr());
// console.log(burrito.toStr());

// console.log(menu.toStr());
// console.log(chicos.toStr());
