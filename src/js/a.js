var box = {};
var x = 7;
var y = 7;
box.material = "cardboard";
box.func = function(){return x + y};
box.func1= function(){console.log("test")};


//console.log(box.material)
console.log(box.func());
//console.log(box["material"]);

var animal = {};
animal.username = "ant";
animal.tagline = "tag";
animal.noises = [];
console.log(animal);

for(var key in animal)
{
	console.log(animal[key]);
}

/*
myTest="it is global";
function testScope() {
//console.log(myTest);
var myTest = true;
console.log(myTest);
if (true) {
	console.log(myTest);

	var myTest = "I am changed!"
}
console.log(myTest);
}
testScope();
console.log(myTest);
*/

function test()
{
	var mytest="under parent";

	function test1()
	{
		console.log(mytest);
		var mytest = "under child";
	}
	console.log(mytest);
	test1();
}

test();