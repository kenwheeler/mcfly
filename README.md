#McFly
Flux Architecture Made Easy

*What is McFly?*

When writing ReactJS apps, it is enormously helpful to use Facebook's Flux architecture. It truly complements ReactJS' unidirectional data flow model. Facebook's Flux library provides a Dispatcher, and some examples of how to write Actions and Stores. However, there are no helpers for Action & Store creation, and Stores require 3rd part eventing.

McFly is a library that provides all 3 components of Flux architecture, using Facebook's Dispatcher, and providing factories for Actions & Stores.

###Demo

Check out this JSFiddle Demo to see how McFly can work for you:

[http://jsfiddle.net/6rauuetb/](http://jsfiddle.net/6rauuetb/)

###Dispatcher

McFly uses Facebook Flux's dispatcher. When McFly is instantiated, and a single dispatcher instance is created and can be accessed like shown below:

```javascript
var mcFly = new McFly();

return mcFly.dispatcher;
```
In fact, all created Actions & Stores are also stored on the McFly object as `actions` and `stores` respectively.

###Stores

McFly has a **createStore** helper method that creates an instance of a Store. Store instances have been merged with EventEmitter and come with **emitChange**, **addChangeListener** and **removeChangeListener** methods built in.

When a store is created, its methods parameter specified what public methods should be added to the Store object. Every store is automatically registered with the Dispatcher and the `dispatcherID` is stored on the Store object itself, for use in `waitFor` methods.

Creating a store with McFly looks like this:

```javascript
var _todos = [];

function addTodo(text) {
  _todos.push(text);
}

var TodoStore = mcFly.createStore({

getTodos: function() {
  return _todos;
}

}, function(payload){

  switch(payload.actionType) {
  case 'ADD_TODO':
    addTodo(payload.text);
  break;
  default:
    return true;
  }

  TodoStore.emitChange();

  return true;

});
```

Use `Dispatcher.waitFor` if you need to ensure handlers from other stores run first.

```javascript
var mcFly = new McFly();
var Dispatcher = mcFly.dispatcher;
var OtherStore = require('../stores/OtherStore');
var _todos = [];

function addTodo(text, someValue) {
  _todos.push({ text: text, someValue: someValue });
}

 ...

    case 'ADD_TODO':
      Dispatcher.waitFor([OtherStore.dispatcherID]);
      var someValue = OtherStore.getSomeValue();
      addTodo(payload.text, someValue);
      break;

 ...
```

Stores are also created a with a ReactJS component mixin that adds and removes store listeners that call an **storeDidChange** component method.

Adding Store eventing to your component is as easy as:

```javascript
var TodoStore = require('../stores/TodoStore');

var TodoApp = React.createClass({

  mixins: [TodoStore.mixin],

  ...
```
###Actions

McFly's **createActions** method creates an Action Creator object with the supplied singleton object. The supplied methods are inserted into a Dispatcher.dispatch call and returned with their original name, so that when you call these methods, the dispatch takes place automatically.

Adding actions to your app looks like this:

```javascript
var mcFly = require('../controller/mcFly');

var TodoActions = mcFly.createActions({
  addTodo: function(text) {
    return {
      actionType: 'ADD_TODO',
      text: text
    }
  }
});
```

All actions methods return promise objects so that components can respond to long functions. The promise will be resolved with no parameters as information should travel through the dispatcher and stores. To reject the promise, return a falsy value from the action's method. The dispatcher will not be called if the returned value is falsy or has no actionType.

You can see an example of how to use this functionality here:

http://jsfiddle.net/thekenwheeler/32hgqsxt/

## API

###McFly

```javascript
var McFly = require('mcfly');

var mcFly = new McFly();
```

### createStore

```javascript
/*
 * @param {object} methods - Public methods for Store instance
 * @param {function} callback - Callback method for Dispatcher dispatches
 * @return {object} - Returns instance of Store
 */
```

### createActions

```javascript
/**
 * @param {object} actions - Object with methods to create actions with
 * @constructor
 */
```
