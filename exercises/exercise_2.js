module.exports = function(db) {
	// Which users checked out any of the Lord of the Rings trilogy?

	// Find movie titles that start with "The Lord of the Rings"
	db.collection("movies").find({
		title: {
			$regex: /The Lord of the Rings:+/
		}
	}).toArray(function(err, docs){
		if(err){
			return console.log(err);
		}
		// Push matching movie ids into an array
		var lotrMovieIds = [];
		for(var i = 0; i < docs.length; i++){
			lotrMovieIds.push(docs[i].movieId.toString());
		}

		db.collection("checkouts").find({
			// Search "checkouts" collection for the movie ids found above
			movieId: {
				$in: lotrMovieIds
			}
		}).toArray(function(err,docs){
			if(err){
				return console.log(err);
			}
			// Remove duplicate user ids
			var lotrUserIds = [];
			for(var j = 0; j < docs.length; j++){
				if(lotrUserIds.indexOf(docs[j].userId) === -1){
					lotrUserIds.push(docs[j].userId);
				}
			}
			lotrUserIds.sort(function(a,b){
				return a-b;
			});
			var users = lotrUserIds.toString(" ");
			console.log("Exercise 2:\n\tThe LOTR movies were checked out by users: " + users);
		});

	});

};

