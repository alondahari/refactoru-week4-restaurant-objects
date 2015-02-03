var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

FoodItem.prototype.toString = function () {
	var vegan = this.vegan ? 'vegan' : 'not vegan',
			glutenFree = this.glutenFree ? 'gluten free' : 'contains gluten',
			citrusFree = this.citrusFree ? 'citrus free' : 'contains citrus';
	return 'name: ' + this.name +
		', calories: ' + this.calories +
		', dietary information: ' + vegan + ', ' + glutenFree + ', ' + citrusFree;
}