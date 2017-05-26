module.exports = function(db) {
	// Which month had the most checkouts overall?

	// Find month with most checkouts using sortByCount
	db.collection("checkouts").aggregate([
	{
		$sortByCount: "$month"
	}
	], function(err, arr){
		if(err){
			return console.log(err);
		}
		console.log("Exercise 4:\n\tMonth " + arr[0]._id + " had the most checkouts: " + arr[0].count);
	});
};



