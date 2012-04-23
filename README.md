#reticle.js

Reticle.js is a framework agnostic modal library designed for simplicity.

It should support as far back as IE6, but as this is still in early stages I haven't had a chance to test yet.


##Initialization
Include reticle.js and reticle.css in your document/pipeline of course.

Then set up your modal content markup.

```html
<div id="my-modal">
  <p>This content will be wrapped with the necessary reticle css upon initialization.
</div>
```

Then initialize reticle with this content.

```javascript
//To initialize a new modal, which applies the necessary reticle.css classes to your div,
// just provide the DOMElement reference for your div with your modal's unique ID. 
//   (maybe this should just take the id)
reticle.new({
  content: document.getElementById('my-modal')
});

//To bind some buttons as well
reticle.new({
  buttonClass: 'my-modal-button'
  content: document.getElementById('my-modal')
});
```

##Manipulation
If you'd like to programmatically show/hide/bind things about the modal, rather than relying on the simple button-click bind provided by default, these helper methods are available after initialization.

There are two ways to reference your reticle instance. Use whichever fits your needs of course.

####Global Helper Methods
You can pass your modal's ID to static helper methods to call public API functions.

```javascript
//Show your initialized modal
reticle.show('my-modal');

//Hide your initialized modal
reticle.hide('my-modal');

//Bind a button to show your modal
reticle.bind('my-modal','my-modal-button');

```
####Standard Object Methods
And since reticle.new returns a new reticle object, you can store that and reference it however you like.

```javascript
var reticle_one = reticle.new({content: document.getElementById('my-modal')});
//show
reticle_one.show();
//hide
reticle_one.hide();
//bind
reticle_one.bind('reticle-one-button-class');
```

##Thanks

* [jyoungblood](https://github.com/jyoungblood/smoke.js/) - design inspiration