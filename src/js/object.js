//object literals

var cat = {
	name : "shafali",
	age : "19",
	speak : function(name){
		console.log("cat is speaking "+ name)
	}
}


cat.speak("meooo");
dog = cat;
dog.speak("bhon bhon");


//new object

function Dog(name, age){
	this.name = name;
	this.age = age;
} 

var dog = new Dog("puppy", 9);
console.log(dog.name);