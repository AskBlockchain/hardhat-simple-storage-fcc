const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimleStorage", function () => {}) ~ can also be written like this
describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  // let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Shoud start with a favorite nuber of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "766";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
    //expect(currentValue.toString()).to.equal(expectedValue)
  });

  it("Should add a Person Name & Favourite Number to an Array and Update Mapping", async function () {
    const expectedName = "Stan";
    const expectedFavoriteNumber = "56";
    const transactionResponse = await simpleStorage.addPerson(
      expectedName,
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);

    const person = await simpleStorage.people(0);
    // const favNumber = person.favoriteNumber
    // const pName = person.name
    assert.equal(person.name, expectedName, "Name wasn't added to the Array");
    assert.equal(
      person.favoriteNumber,
      expectedFavoriteNumber,
      "Number wasn't added to the Array"
    );
  });
});
