// __tests__/Store-test.js

jest.dontMock('../Store');
jest.dontMock('../Dispatcher');
jest.dontMock('object-assign');
jest.dontMock('invariant');

describe('Store', () => {

  const Store = require('../Store').default;

  let mockStore = new Store({
    testMethod: () => true,
  }, ({ actionType }) => {
    switch(actionType) {
      case 'ADD_TEST':
        return true;
      break;
    }
  });

  it('should return a new instance with methods attached via the methods argument', () => {

    expect(mockStore.testMethod).toBeDefined();

  });

  it('should attach the supplied callback to the new instance', () => {

    expect(mockStore.callback).toBeDefined();

  });

  it('should be merged with EventEmitter', () => {

    expect("on" in mockStore).toEqual(true);
    expect("removeListener" in mockStore).toEqual(true);
    expect("emit" in mockStore).toEqual(true);

  });

  it('should create a mixin property', () => {

    expect(mockStore.mixin).toBeDefined();

  });

  it('should return a dispatcherID when getDispatchToken is called', () => {

    mockStore.dispatcherID = 5;
    expect(mockStore.getDispatchToken()).toEqual(5);

  });

  it('should throw if a supplied method is named "callback"', () => {

    expect(() => {
      Store.constructor({
        callback: function(){
          return true;
        }
      },function(payload){});
    }).toThrow();

  });

  it('should throw if a supplied method is named "mixin"', () => {

    expect(() => {
      Store.constructor({
        mixin: function(){
          return true;
        }
      },function(payload){});
    }).toThrow();

  });

});
