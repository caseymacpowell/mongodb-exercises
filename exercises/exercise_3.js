module.exports = function(db) {
	//What is the title of the movie(s) that was the most checked out?

		// Use sortByCount to find movieId with greatest count
		db.collection("checkouts").aggregate([
			{
				$sortByCount: "$movieId"
			}
			], function(err, arr){
				if(err){
					return console.log(err);
				}
				// Push movieId of highest count(s) and parseInt those values so 
				//they can be compared to "movies" collection
				var moviesIdArr = [];
				moviesIdArr.push(parseInt(arr[0]._id));
				for(var i = 1; i < arr.length; i++){
					if(arr[0].count === arr[i].count){
					moviesIdArr.push(parseInt(arr[i]._id));
					}
				}

				// Search "movies" collection for titles matching the ids found above
				db.collection("movies").find({
					movieId: {
						$in: moviesIdArr
					}
				}).toArray(function(err, docs){
					if(err){
						return console.log(err);
					}
					console.log ("Exercise 3:\n\tThe movie(s) " + docs[0].title + " -- checked out " + arr[0].count + " times");
				});
				
			});
};
