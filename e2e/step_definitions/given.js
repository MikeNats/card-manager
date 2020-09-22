const { expect } = require('chai');
const openBrowser = require('../support/openBrowser');
const {Given , Then} = require('cucumber')

Given(/^I go to the website "([^"]*)"$/, openBrowser);

Then(/^I expect the title of the page "([^"]*)"$/, (title) => {
  expect(browser.getTitle()).to.be.eql(title);
});
