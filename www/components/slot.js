// This is a JavaScript file

var SlotColumn = Class.create();
SlotColumn.prototype = {
  _options : {
    'isUp': false,
    'frameRate': 16,
    'maxSpeed': 8
  },
  
  _slotObject: null,
  _pe: null,
  _sc: 0,
  _slotHeight: null,
  _slotItemCount: null,
  _slotRTop: null,
  _isStart: false,
  _isStop: false,
  
  
  _peFunction: function () {
    var _st = this._slotObject.scrollTop;
    
    if (this._options['isUp']) {
      _st += this._sc;
      if (_st >= this._slotRTop) {
        _st = this._slotRTop - _st;
      }
    } else {
      _st -= this._sc;
      if (0 >= _st) {
        _st = this._slotRTop + _st;
      }
    }
    
    this._slotObject.scrollTop = _st;

    
    if (this._isStart) {
      if (this._sc < this._options['maxSpeed']) {
        this._sc *= 2;
        if (this._sc > this._options['maxSpeed']) {
          this._sc = this._options['maxSpeed'];
        }
      } else {
        this._isStart = false;
      }
    }
    
    if (this._isStop) {
        if (2 > this._sc) {
          this._sc = 1;
          if (0 === _st || 0 === _st % this._slotHeight) {
            this._pe.stop();
            this._pe = null;
            this._isStop = false;
            this._fireCallback('Stop', this.getResult());
          } 
        } else {
          this._sc /= 2;
        }
    }
  },
  
  _fireCallback: function(name, result) {
    if (this._options['on' + name]) {
      this._options['on' + name](result);
    }
  },
  
  setOption: function(name, value) {
    this._options[name] = value;
  },
  
  isMoving: function() {
    return this._pe !== null ? true : false;
  },
  
  getResult: function() {
    if (!this.isMoving()) {
      var r = this._slotObject.scrollTop / this._slotHeight;
      return (r === this._slotItemCount) ? 0 : r;
    }
    
    return false;
  },
  
  stop: function(callback) {
    if (undefined !== callback) {
      this._options['onStop'] = callback;
    }  
    
    if (this._pe !== null) {
      this._isStart = false;
      this._isStop = true;
      
      return true;
    }
    
    return false;
  },
  
  start: function() {
    if (this._pe === null) {
      this._sc = 1;
      this._isStart = true;
      this._isStop = false;
      this._pe = new PeriodicalExecuter(this._peFunction.bind(this), 1/this._options['frameRate']);
      
      return true;
    }
    
    return false;
  },

  initialize: function(id, options) {
    options = options || {};
    this._options = $H(this._options).merge($H(options)).toObject();
  
    this._slotObject = $(id);
    this._slotObject.addClassName('slot');
    
    var lists = this._slotObject.select('ul');
    
    if (0 < lists.length) {
      var lis = lists[0].select('li');
      if (1 < lis.length) {
        this._slotItemCount = lis.length;
        this._slotHeight = lis[0].getHeight();
        this._slotRTop = this._slotHeight * this._slotItemCount;
 
        var nElm = new Element('li');
        nElm.update(lis[0].innerHTML);
        lists[0].insert(nElm);
      }
    }
  }
};
var s1 = new SlotColumn('slot1', {
  'onStop' : function (result) {
  

  },
  'maxSpeed' : 20,
  'isUp' : true
});