/**
 * Expose 'reticle' as object prototype and id-referencing helper
 */

window.reticle = function(o){
  if(typeof o === 'object'){
    //this must be a reticle initialization
    this.id = o.content.id;
    this.render(o.content);
    if(o.buttonClass) this.bind(o.buttonClass); 
  }else{
    //this must be meant to find a specific reticle by id
    return reticle.s[o];
  }
};

/**
 * A simple new helper
 */
window.reticle.new = function(options){
  return new window.reticle(options);
};

/**
 * Show an initialized modal
 *
 * @param (String) id - The ID of the modal to be shown.
 * @return reticle - a reticle reference for chaining calls
 * @api public
 */
window.reticle.show = function(id){
  if(reticle.s[id]) reticle.s[id].show();
  else throw new Error('ReticleUnitialized',"Attempted to show an uninitialized reticle.");
  return reticle.s[id];
};

/**
 * Hide an initialized modal
 *
 * @param (String) id - The ID of the modal to be hidden.
 * @return reticle - a reticle reference for chaining calls
 * @api public
 */
window.reticle.hide = function(id){
  if(reticle.s[id]) reticle.s[id].hide();
  else throw new Error('ReticleUnitialized',"Attempted to hide an uninitialized reticle.");
  return reticle.s[id];
};

/**
 * Hide an initialized modal
 *
 * @param (String) id - The ID of the modal to be bound.
 * @param (String) buttonClass - the class of buttons to bind clicks to reticle.show
 * @return reticle - a reticle reference for chaining calls
 * @api public
 */
window.reticle.bind = function(id, buttonClass){
  if(reticle.s[id]) reticle.s[id].bind(buttonClass);
  else throw new Error('ReticleUnitialized',"Attempted to bind an uninitialized reticle.");
  return reticle.s[id];
};

/**
 *  A POJO for referencing initialized reticles by ID
 */
window.reticle.s = {};


reticle.prototype = {
  /**
   * Bind reticle.show to some button's click event
   *
   * @param (String) buttonClass - The class of your modal-triggering button(s)
   * @return reticle - a reticle reference for chaining calls
   * @api public
   */
  bind: function(buttonClass) {
    var buttons = document.getElementsByClassName(buttonClass);
    var id = this.id;
    for (var i = 0;i < buttons.length; i++) {
      this.listen(buttons[i], 'click', function(){
        reticle.show(id);
      });
    }
    return this;
  },
  
  /**
   * Show the modal
   *
   * @param (Event) e or null - an optional event to kill
   * @return reticle - a reticle reference for chaining calls
   * @api public
   */
  show: function(e) {
    if(e && e.stopPropagation) e.stopPropagation();
    if(e && e.preventDefault) e.preventDefault();
    this.container.className = 'reticle-base reticle-visible';
    return this;
  },
  
  /**
   * Hide the modal
   *
   * @param (Event) e or null - an optional event to kill
   * @return reticle - a reticle reference for chaining calls
   * @api public
   */
  hide: function(e){
    if(e && e.stopPropagation) e.stopPropagation();
    if(e && e.preventDefault) e.preventDefault();
    this.container.className = 'reticle-base reticle-hidden';
    return this;
  },
  
  /**
   * Write the modal HTML to the DOM and bind a simple closing event
   *
   * @param (DOMElement) elem - a plain ole DOMElement 
   *                      with some innerHTML as modal content and a unique id
   * @return reticle - a reticle reference for chaining calls
   * @api public
   */
  render: function(elem){
    if(document.getElementById('reticle-blur')) throw new Error({name: "ReticleInitialize", message: "You attempted to initialize reticle more than once."});
    var html = this.getContent(elem);
    var container = document.createElement('div');
    container.setAttribute('id', elem.id);
    container.className = 'reticle-base reticle-hidden';
    
    container.innerHTML = "<div id=\"reticle-blur-inner\" class=\"reticle-bg\"></div>\n<div class=\"reticle-focus \">\n    <div class=\"reticle-focus-inner\">\n      " + html + "\n    </div>\n</div>";
    
    document.body.appendChild(container);
    this.listen(container.firstElementChild, 'click', function(){
      reticle.hide(elem.id);
    });
    this.container = container;
    reticle.s[elem.id] = this;
    return this;
  },
  
  /**
   * Extracts HTML from the content being provided to reticle
   *
   * @param (DOMElement) elem - a plain ole DOMElement with some innerHTML as modal content
   *                      the element will be removed from the body and replaced
   * @return html - the HTML to be used as modal content
   * @api private
   */
  getContent: function(elem){
    if(typeof elem === 'object' && typeof elem.innerHTML === 'string'){
      html = elem.innerHTML;
      document.getElementsByTagName('body')[0].removeChild(elem);
    }else{
      throw new Error(
        {name: "ReticleElementError",
        message: "Reticle: You passed something that wasn't a plain DOM object with an innerHTML reference."}
      );
    }
    return html;
  },
  
  /**
   * A standard event listener/attacher
   *
   * @param (DOMElement) elem - The element to which an event will be bound
   * @param (String) ev - The name of the event to be bound
   * @param (Function) func - Function to call upon event being fired
   * @return reticle - a reticle reference for chaining calls
   * @api private/public
   */
  listen: function(elem, ev, func) {
    if (elem.addEventListener) elem.addEventListener(ev, func, false);
    if (elem.attachEvent) elem.attachEvent('on' + ev, func);
    return this;
  }
};