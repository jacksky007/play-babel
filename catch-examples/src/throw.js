try {
	undefined()
	undefined()
} catch (e) {
	console.log(e)
	if (Math.random() < .5) {
		throw e
	}
	throw new Error('error has benn resolved and rethrown')
}
