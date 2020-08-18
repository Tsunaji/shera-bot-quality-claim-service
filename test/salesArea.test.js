const { Helpers } = require("../Helpers");

const helpers = new Helpers();

test('send A2 should get email = crmclaim_a2@shera.com', () => {
    expect(helpers.getSalesAreaMail("A2")).toBe("crmclaim_a2@shera.com");
});

test('send A3 should get email = crmclaim_a3@shera.com', () => {
    expect(helpers.getSalesAreaMail("A3")).toBe("crmclaim_a3@shera.com");
});

test('send A4 should get email = crmclaim_a4@shera.com', () => {
    expect(helpers.getSalesAreaMail("A4")).toBe("crmclaim_a4@shera.com");
});