module.exports = function(db) {
	// Which movie(s) had the most checkouts in April?

	// Look for all months with value "apr" and sortByCount using movie id
	db.collection("checkouts").aggregate([
	{
		$match: {
			month: "apr"
		}
	},{
		$sortByCount: "$movieId"
	}
	], function(err, arr){
		if(err){
			return console.log(err);
		}
		// Push movie(s) with hgihest count into an array
		var moviesIdArr = [];
		moviesIdArr.push(parseInt(arr[0]._id));
		for(var i = 1; i < arr.length; i++){
			if(arr[0].count === arr[i].count){
				moviesIdArr.push(parseInt(arr[i]._id));
			}
		}

		// Use moviesIdArr to search "movies" collection
		db.collection("movies").find({
			movieId: {
				$in: moviesIdArr
			}
		}).toArray(function(err, docs){
			if(err){
				return console.log(err);
			}
			var movies = "";
			for(var j = 0; j < docs.length; j++){
				movies = movies + docs[j].title + ", ";
			}
			console.log("Exercise 5:\n\tMovies " + movies + "had the most checkouts in April: " + arr[0].count);
		});
	});
};
