module.exports = function(db) {
	// What user(s) had the most checkouts?

	// Use sort by count on userIds
	db.collection("checkouts").aggregate([
		{
			$sortByCount: "$userId"
		}
		], function(err, arr){
			if(err){
				return console.log(err);
			}
			// Push userId(s) with highest count to an array
			var usersArr = [];
			usersArr.push(arr[0]._id);
			for(var i = 1; i < arr.length; i++){
				if(arr[0].count === arr[i].count){
					usersArr.push(arr[i]._id);
				}
			}
			// Turn array into string
			usersArr.toString(", ");
			console.log("Exercise 6:\n\tUser(s) " + usersArr + " had the most checkouts: " + arr[0].count);
		});
	};




