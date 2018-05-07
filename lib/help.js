module.exports = class Help {
	static show() {
		console.info(`
		dict <words>
		translate and exit

		dict - <words>
		translate, show detail, stay in translate loop

		dict -f <language> -t <language> - as long as
		translate form ch to en

		dict -f <language> -t <language> -o - as long as
		search and open web page
		`.replace(/\s+/gm, ''))
	}
}