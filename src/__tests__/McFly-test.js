// __tests__/Store-test.js

jest.dontMock('../McFly');
jest.dontMock('../Store');
jest.dontMock('../ActionsFactory');
jest.dontMock('../Dispatcher');
jest.dontMock('object-assign');

describe('McFly', function() {

  var McFly = require('../McFly');
  var Store = require('../Store');
  var ActionsFactory = require('../ActionsFactory');
  var TestConstants = {
    TEST_ADD: 'TEST_ADD',
    TEST_REMOVE: 'TEST_REMOVE'
  };

  var mcFly,mockStore,mockActionsFactory,testItems;

  beforeEach(function() {

    mcFly = new McFly();

    var items = [];
    mockStore = mcFly.createStore(
    {
      getItems: function() {
        return items;
      }
    }, function(payload) {
      switch(payload.actionType) {
        case TestConstants.TEST_ADD:
          items.push(payload.item);
        break;
        case TestConstants.TEST_REMOVE:
          items.splice(items.indexOf(payload.item), 1);
        break;
        default:
          return true;
      }
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

  });

  it('should instantiate a new dispatcher and attach it to the new instance', function() {

    expect(mcFly.dispatcher).toBeDefined();

  });

  it('should create a new Store when createStore is called', function() {

    expect(mockStore instanceof Store).toEqual(true);

  });

  it('should store created Stores in a stores property', function() {

    expect(mcFly.stores.indexOf(mockStore) !== -1).toEqual(true);

  });

  it('should register created Stores with the Dispatcher and store the token', function() {

    expect(mockStore.getDispatchToken()).toMatch(/ID_\d+/);

  });

  it('should create a new ActionsFactory when createActions is called', function() {

    expect(mockActionsFactory instanceof ActionsFactory).toEqual(true);

  });

  it('should store created ActionsFactory methods in an actions property', function() {

    expect("add" in mcFly.actions).toEqual(true);

  });

});
