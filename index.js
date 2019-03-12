var blacklist = require('./terms-to-block.json')

module.exports = function(terms) {
	var sanitizedTerms = String(terms).replace(/([^a-zA-Z0-9 \.,!\?]*)/g, '').toLowerCase()

	for (var i = 0; i < blacklist.length; i++) {
		let blacklistedWord = blacklist[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').toLowerCase()

		let regexp = new RegExp(blacklistedWord+"[ \\.,!\\?]")

		if (sanitizedTerms.match(regexp) ||
			(sanitizedTerms.indexOf(blacklistedWord) > -1 && sanitizedTerms.indexOf(blacklistedWord)+blacklistedWord.length === terms.length))
			return true
	}

	return false
}