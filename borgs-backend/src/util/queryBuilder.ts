export function updateTransactionById(id : number, cols) {
	// Setup static beginning of query
	var query = ['UPDATE Transactions'];
	query.push('SET');

	// Create another array storing each set command
	// and assigning a number value for parameterized query
	var set : String[] = [];
	Object.keys(cols).forEach(function (key, i) {
		set.push(key + ' = ($' + (i + 1) + ')');
	});
	query.push(set.join(', '));

	// Add the WHERE statement to look up by id
	query.push('WHERE transaction_id = ' + id);

	// Return a complete query string
	return query.join(' ');
}