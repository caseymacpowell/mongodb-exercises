module.exports = function(db) {
	// How many movies are there?
	db.collection("movies").distinct("movieId",function(err, data){
		console.log("Exercise 1:\n\tThere are " + data.length + " movies");
	});

	
};
