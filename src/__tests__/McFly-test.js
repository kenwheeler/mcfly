// __tests__/Store-test.js

jest.dontMock('../McFly');
jest.dontMock('../Store');
jest.dontMock('../ActionsFactory');
jest.dontMock('../Action');
jest.dontMock('../Dispatcher');


describe('McFly', () => {

  var McFly = require('../McFly');
  var Store = require('../Store').default;
  var ActionsFactory = require('../ActionsFactory').default;
  var TestConstants = {
    TEST_ADD: 'TEST_ADD',
    TEST_REMOVE: 'TEST_REMOVE'
  };

  var mcFly, mockStore, mockActionsFactory;
  const testItems = [];

  mcFly = new McFly();

  mockStore = mcFly.createStore({
    getItems: () => testItems,
  }, function(payload) {
    switch(payload.actionType) {
      case TestConstants.TEST_ADD:
        testItems.push(payload.item);
      break;
      case TestConstants.TEST_REMOVE:
        testItems.splice(testItems.indexOf(payload.item), 1);
      break;
      default:
        return true;
    }
    return true;
  });

  mockActionsFactory = mcFly.createActions({
    add: function(item) {
      return {
        actionType: TestConstants.TEST_ADD,
        item: item
      }
    },
    remove: function(item) {
      return {
        actionType: TestConstants.TEST_REMOVE,
        item: item
      }
    }
  });

  it('should instantiate a new dispatcher and attach it to the new instance', () => {

    expect(mcFly.dispatcher).toBeDefined();

  });

  it('should create a new Store when createStore is called', () => {

    expect(mockStore instanceof Store).toEqual(true);

  });

  it('should store created Stores in a stores property', () => {

    expect(mcFly.stores.indexOf(mockStore) !== -1).toEqual(true);

  });

  it('should register created Stores with the Dispatcher and store the token', () => {

    expect(mockStore.getDispatchToken()).toMatch(/ID_\d+/);

  });

  it('should create a new ActionsFactory when createActions is called', () => {

    expect(mockActionsFactory instanceof ActionsFactory).toEqual(true);

  });

  it('should store created ActionsFactory methods in an actions property', () => {

    expect("add" in mcFly.actions).toEqual(true);

  });

  pit('should digest the correct payload in the store when it is dispatched', async () => {

    const testItem = 'test';

    await mockActionsFactory.add(testItem);
    expect(mockStore.getItems()).toEqual([testItem]);

    await mockActionsFactory.remove(testItem);
    expect(mockStore.getItems()).toEqual([]);

  });

});
