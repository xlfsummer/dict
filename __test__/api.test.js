let api = require('../lib/api');

describe(api.send, () => {
    it("fetch data", done => {
        api.search("你好").then(result => {
            console.dir(result);
            expect(result).toBeTruthy();
            done();
        }).catch(e => {
            console.dir(e);
        });
    });
});

describe(api.get, () => {
    it('get', done => {
        api.get("https://www.baidu.com").then(data => {
            expect(data.includes('百度一下，你就知道')).toBe(true);
            done();
        })
    })
})