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
  var mcFly,mockStore,mockActionsFactory;

  mcFly = new McFly();

  it('should instantiate a new dispatcher and attach it to the new instance', function() {

    expect(mcFly.dispatcher).toBeDefined();

  });

  it('should create a new Store when createStore is called', function() {

    mockStore = mcFly.createStore({testMethod: function(){}}, function(){});

    expect(mockStore instanceof Store).toEqual(true);

  });

  it('should store created Stores in a stores property', function() {

    expect(mcFly.stores.indexOf(mockStore) !== -1).toEqual(true);

  });

  it('should register created Stores with the Dispatcher and store the token', function() {

    expect(mockStore.getDispatchToken()).toEqual("ID_1");

  });

  it('should create a new ActionsFactory when createActions is called', function() {

    mockActionsFactory = mcFly.createActions({
      testMethod: function(test) {
        return {
          actionType: 'TEST_ADD',
          data: test
        }
      }
    });

    expect(mockActionsFactory instanceof ActionsFactory).toEqual(true);

  });

  it('should store created ActionsFactory methods in an actions property', function() {

    expect("testMethod" in mcFly.actions).toEqual(true);

  });

});