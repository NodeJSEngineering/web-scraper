const superagent = require("superagent")
const forumURL = "https://www.reddit.com/r/programming.json"

// callbacks
superagent
	.get(forumURL)
	.end((error, response) => {
		console.log(response)
	})

// promises
superagent
	.get(forumURL)
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	})

// promises with async/await
async function getForum() {
	try {
		const response = await superagent.get(forumURL)
		console.log(response)
	} catch (error) {
		console.error(error)
	}
}