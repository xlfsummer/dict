let Cli = require('../lib/cli');

describe(Cli.retriveOption, () => {
	it('retive option', () => {
		let argv = ['-d'];
		let result = Cli.retriveOption(argv, '-d');
		expect(result).toBe(true);
		expect(argv).toEqual([]);
	})

	it('retive option', () => {
		let argv = ['-a', '-b', '--c'];
		let result = Cli.retriveOption(argv, '-c', 0);
		expect(result).toBeNull();
		expect(argv).toEqual(['-a', '-b', '--c']);
	})

	it('retive option with params', () => {
		let argv = ['-l', 'zh', '-', 'hello', 'world'];
		let result = Cli.retriveOption(argv, '-l', 1);
		expect(result).toEqual('zh');
		expect(argv).toEqual(['-', 'hello', 'world']);
	})
});