var expect = require("chai").expect,
  midsomermurderplots = require("../index");

describe("Text generator", function() {

  it("generates a string", function() {
    var generated_string = midsomermurderplots.generate(null);
    expect(typeof (generated_string)==='string' && generated_string.length > 0);
  });

  it("generates same string for same seed", function() {
    expect(midsomermurderplots.generate(-3) == midsomermurderplots.generate(-3));
  });

  it("generates different strings for different seeds", function() {
    expect(midsomermurderplots.generate(-3) != midsomermurderplots.generate(2));
  });


});
