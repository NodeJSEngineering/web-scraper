const axios = require('axios')

axios
	.get('https://www.reddit.com/r/programming.json')
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	});