function $(str){
  return new Base(str);
}
function Base(str){
  this.elements = [];
  if (typeof str == 'string') {
    if (str.indexOf(' ') != -1) {
      var element = str.split(' ');
      var parent = [];
      var child = [];
      parent[0] = document
      for (var i = 0; i < element.length; i++) {
        switch (element[i].charAt(0)) {
          case '#':
            child = [];
            child = this.getId(element[i].substring(1));
            parent = child;
            break;
          case '.':
            child = [];
            for (var j = 0; j < parent.length; j++) {
              child = this.getClass(element[i].substring(1),parent[j]);
            }
            parent = child;
            break;
          default:
            child = [];
            for (var m = 0; m < parent.length; m++) {
              child = this.getTag(element[i],parent[m]);
            }
            parent = child;
            break;
        }
      }
      this.elements = child;
    }else{
      switch (str.charAt(0)) {
        case '#':
          this.elements = this.getId(str.substring(1));
          break;
        case '.':
          this.elements = this.getClass(str.substring(1));
          break;
        default:
          this.elements = this.getTag(str);
          break;
      }
    }
  }else if(typeof str == 'object'){
    this.elements[0] = str;
  }else if(typeof str == 'function'){
	  window.onload = str;
  };
  this.length = this.elements.length;//原型的私有属性
}
Base.prototype.getId = function(id){
  var temps = [];
  temps.push(document.getElementById(id));
  return temps;
}
Base.prototype.getClass = function(className,father){
  var temp = [];
  var node = null;
  if (father != undefined) {
    node = father;
  }else{
    node = document;
  }
  var all = node.getElementsByTagName('*');
  for (var i = 0; i < all.length; i++) {
    if (all[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
      temp.push(all[i]);
    }
  }
  return temp;
}
Base.prototype.getTag = function(TagName,father){
  var temps = [];
  var node = null;
  if (father != undefined) {
    node = father;
  }else{
    node = document;
  }
  var all = node.getElementsByTagName(TagName);
  for (var i = 0; i < all.length; i++) {
    temps.push(all[i]);
  };
  return temps;
}
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 1){
			if(typeof attr == 'object'){
				for(var j in attr){
					this.elements[i].style[j] = attr[j];
				}
			}else if(typeof attr == 'string'){
				if (typeof window.getComputedStyle != 'undefined') {
					return window.getComputedStyle(this.elements[i],null)[attr]
				}else if (typeof this.elements[i].currentStyle != 'undefined') {
					return this.elements[i].currentStyle[attr]
				}
			}
		}else{
			this.elements[i].style[attr] = value;
		}
	}
	return this;
}
Base.prototype.opacity = function(value){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.opacity = value/100;
    this.elements[i].style.filter = 'alpha(opacity=' + value + ')';
  }
  return this;
}
Base.prototype.html = function(value){
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].innerHTML;
    }else{
      this.elements[i].innerHTML = value;
    }
  }
  return this;
}
Base.prototype.text = function(value){
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 0) {
		  return this.elements[i].textContent;
		}else{
		  this.elements[i].textContent = value;
		}
	  }
	return this;
}
Base.prototype.val = function(value){
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 0) {
		  return this.elements[i].getAttribute('value');
		}else{
			alert('a')
		  this.elements[i].setAttribute('value',value);
		}
	  }
	return this;
}
Base.prototype.attr = function(attr){
	//for (var i = 0; i < this.elements.length; i++) {
		return this.elements[0][attr];
	// }
}
//原型的方法
Base.prototype.length = function(){
  return this.elements.length;
}

Base.prototype.prev = function () {
  for (var i = 0; i < this.elements.length; i++) {
    var previous = [];
    previous[0] = this.elements[i].previousSibling;
    if(previous[0].nodeType == 3){
      previous[0] = previous[0].previousSibling;
      this.elements[0] = [];
      this.elements[0] = previous[0];
    }
  }
  return this;
}
Base.prototype.next = function () {
  for (var i = 0; i < this.elements.length; i++) {
    var next = [];
    next[0] = this.elements[i].nextSibling;
    if(next[0].nodeType == 3){
      next[0] = this.elements[i].nextSibling.nextSibling;
      this.elements[0] = [];
      this.elements[0] = next[0];
    }
  }
  return this;
}
//参数只能传TagName ClassName
Base.prototype.siblings = function (element){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			var all = this.elements[i].parentNode.childNodes;
			var temps = [];
			for(var j = 0; j < all.length; j++){
				if(all[j].nodeType == 1 && all[j] != this.elements[i]){
					temps.push(all[j])
				}
			}
		}else{
			var type = element.charAt(0);
			var all = this.elements[i].parentNode.childNodes;
			var temps = [];
			for(var j = 0; j < all.length; j++){
				if(all[j].nodeType == 1 && all[j] != this.elements[i]){
					switch(type){
						case '.':
							temps = this.getClass(element.substring(1));
							break;
						default:
							if(all[j].nodeName.toLowerCase() == element){
								temps.push(all[j]);
							};
							break;
					}
				}
			}
		}
	}
	this.elements = temps;
	return this;
}
Base.prototype.children = function(element){
	var temps = [];
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			var all = this.elements[i].childNodes;
			for(var j = 0; j < all.length; j++){
				if(all[j].nodeType == 1){
					temps.push(all[j])
				}
			}
		}else{
			var all = this.elements[i].childNodes;
			var type = element.charAt(0);
			for(var j = 0; j < all.length; j++){
				if(all[j].nodeType == 1 && all[j] != this.elements[i]){
					switch(type){
						case '.':
							temps = this.getClass(element.substring(1),this.elements[i]);
							break;
						default:
							if(all[j].nodeName.toLowerCase() == element){
								temps.push(all[j]);
							};
							break;
					}
				}
			}
		}
	}
	
	this.elements = temps;
	this.length = this.elements.length;
	return this;
}
Base.prototype.find = function(element){
	var temps = [];
	for(var i = 0; i < this.elements.length; i++){
		var type = element.charAt(0);
		var all = this.elements[i].getElementsByTagName('*');
		for(var j = 0; j < all.length; j++){
			switch(type){
				case '.':
					temps = this.getClass(element.substring(1),this.elements[i]);
					break;
				default:
					if(all[j].nodeName.toLowerCase() == element){
						temps.push(all[j]);
					};
					break;
			}
		}
	}
	this.elements = temps;
	return this;
}

Base.prototype.index = function (){
  var children = this.elements[0].parentNode.children;
  for(var i = 0;i < children.length;i ++){
    if(children[i] == this.elements[0]){
      return i;
    }
  }
}
/*Base.prototype.each = function(index,element){
	var temps = [];
	if(arguments.length == 1){
		for(var i = 0; i < this.elements.length; i++){
			alert(arguments.length)
			return this.elements[i]
		}
	}
}*/
Base.prototype.eq = function(num){
  var newElements = this.elements[num];
  this.elements = [];
  this.elements[0] = newElements
  return this;
}
Base.prototype.first = function(){
  var newElements = this.elements[0];
  this.elements = [];
  this.elements[0] = newElements
  return this.elements[0];
}
Base.prototype.last = function(){
  var newElements = this.elements[this.elements.length-1]
  this.elements = [];
  this.elements[0] = newElements
  return this.elements[0];
}
Base.prototype.click = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onclick = func;
  }
  return this;
}
Base.prototype.dbclick = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].ondbclick = func;
  }
  return this;
}
Base.prototype.mouseenter = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseenter = func;
  }
  return this;
}
Base.prototype.mouseover = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseover = func;
  }
  return this;
}
Base.prototype.mouseleave = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseleave = func;
  }
  return this;
}
Base.prototype.mouseout = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseout = func;
  }
  return this;
}
Base.prototype.mouseup = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseup = func;
  }
  return this;
}
Base.prototype.mousedown = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmousedown = func;
  }
  return this;
}
Base.prototype.mousemove = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmousemove = func;
  }
  return this;
}
Base.prototype.focus = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onfocus = func;
  }
  return this;
}
Base.prototype.blur = function(func){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onblur = func;
  }
  return this;
}
Base.prototype.hover = function(enter,leave){
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onmouseenter = enter;
    this.elements[i].onmouseleave = leave;
  }
  return this;
}
Base.prototype.addClass = function addClass(className){
  for (var i = 0; i < this.elements.length; i++) {
    if (!hasClass(this.elements,className)) {
      if (this.elements[i].className == '') {
        this.elements[i].className = className;
      }else{
        this.elements[i].className += ' '+className;
      }
    }
  }
  return this;
}
Base.prototype.removeClass = function (className){
  for (var i = 0; i < this.elements.length; i++) {
    var c = this.elements[i].className.split(' ');
    for (var j = 0; j < c.length; j++) {
      if (c[j] == className){
        c.splice(j,1);
        this.elements[i].className=c.join(' ');
        return this;
      }
    }
  }
}
// 正则方式
/*Base.prototype.removeClass = function removeClass(className){
  //var str = new RegExp('(\\s|^)'+className+'(\\s|$)')
  for (var i = 0; i < this.elements.length; i++) {
    if(hasClass(this.elements,className)){
      var theRegExp = new RegExp('\\s' + className + '\\s');
      if (theRegExp.test(this.elements[i].className)) {
        this.elements[i].className = this.elements[i].className.replace(theRegExp,' ');
      }else{
        this.elements[i].className = this.elements[i].className.replace(new RegExp('(^' + className + '\\s)|(\\s' + className + '$)|(^' + className + '$)'),'');
      }
    }
  }
  return this;
}*/
Base.prototype.animate = function (obj) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    var attr = obj.attr == 'x' ? 'left' :
              obj.attr == 'y' ? 'top' :
              obj.attr == 'w' ? 'width' :
              obj.attr == 'h' ? 'height' :
              obj.attr == 'o' ? 'opacity' :
              obj.attr ? obj.attr : 'left';
    var step = obj.step ? obj.step : 1;
    var t = obj.t ? obj.t : 10;
    var start = obj.start != undefined ? obj.start :
          attr == 'opacity' ? parseFloat(getStyle(element,attr)) :
                parseInt(getStyle(element,attr));
    var target = obj.target;
    var alter = obj.alter;
    var mul = obj.mul;

    var speed = obj.speed != undefined ? obj.speed : 6;
    var type = obj.type == 0 ? 'constant' :
              obj.type == 1 ? 'buffer' : 'constant';

    if(target == undefined && alter != undefined){
      target = alter + start;

    }else if(target == undefined && alter == undefined && mul == undefined){
      throw new Error('增量和目标量必须传一个');
    }
    if (mul == undefined) {
      mul = {};
      mul[attr] = target;
    }
    if (target <= start) {
      step = -step;
    }

    clearInterval(element.timer);

    element.timer = setInterval(function(){
      for (var j = 0 in mul) {
        attr = j == 'x' ? 'left' :
                j == 'y' ? 'top' :
                j == 'w' ? 'width' :
                j == 'h' ? 'height' :
                j == 'o' ? 'opacity' :
                j != undefined ? j : 'left'
        target = mul[j];
        if (type == 'buffer') {
          step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr))*100)/speed :
                                     (target - parseInt(getStyle(element,attr)))/speed;
          step = step > 0 ? Math.ceil(step) :
                            Math.floor(step);
        }
        var a = target - parseInt(getStyle(element,attr));
        if (attr=='opacity') {
          if (step > 0 && target - parseFloat(getStyle(element,attr))*100 <= step) {
            getOpacity()
          }else if(step < 0 && target - parseFloat(getStyle(element,attr))*100 >= step ){
            getOpacity()
          }else{
            element.style.opacity = (parseFloat(getStyle(element,attr))*100+step)/100;
            element.style.filter = 'alpha(opacity =' + parseFloat(getStyle(element,attr))*100 + step+')';
          }
        }else{
          if (step == 0){
            clearInterval(element.timer)
          }else if (step > 0 && a <= step) {
            getTarget()
          }else if(step < 0 && a >= step){
            getTarget()
          }else{
            element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';
          }
        }
      }
    },t);
    function getOpacity(){
      element.style.opacity = target/100;
      element.style.filter = 'alpha(opacity =' + target + ')';
      clearInterval(element.timer);
      if (obj.fn) {
        obj.fn()
      }
    };
    function getTarget(){
      element.style[attr] = target + 'px';
      clearInterval(element.timer)
      if (obj.fn) {
        obj.fn()
      }
    }
  }
  return this;
}
Base.prototype.createElement = function(node){
	return document.createElement(node);
}
Base.prototype.createText = function(node){
	return document.createTextNode(node);
}
Base.prototype.clone = function(bool){
	if(arguments.length == 0){
		return this.elements[0].cloneNode(true)
	}else{
		return this.elements[0].cloneNode(bool)
	}	
}
Base.prototype.append = function(element){
	var temps = [];
	for(var i = 0; i < this.elements.length; i++){
		temps.push(this.elements[i].appendChild(element));
	}
	return this;
}
Base.prototype.prepend = function(node){
	var temps = [];
	for(var i = 0; i < this.elements.length; i++){
		temps.push(this.elements[i].appendChild(node));
		var allNodes = this.elements[i].childNodes;
		var nodes = [];
		for(var j = 0; j < allNodes.length; j++){
			if(allNodes[j] != allNodes[allNodes.length-1]){
				nodes.push(allNodes[j]);
			}
		}
		for(var j = 0; j < nodes.length; j++){
			temps.push(this.elements[i].appendChild(nodes[j]));
		}
	}
	return this;
}
Base.prototype.before = function(node){
	var temps = [];
	var nodes = [];
	for(var i = 0; i < this.elements.length; i++){
		temps = this.elements[i].parentNode.childNodes
		for(var j = 0; j < temps.length; j++){
			if(temps[j].nodeType == 1){
				nodes.push(temps[j])
			}
		}
		this.elements[i].parentNode.insertBefore(node,nodes[this.index()])
	}
	return this;
}
Base.prototype.after = function(node){
	var temps = [];
	var nodes = [];
	for(var i = 0; i < this.elements.length; i++){
		temps = this.elements[i].parentNode.childNodes
		for(var j = 0; j < temps.length; j++){
			if(temps[j].nodeType == 1){
				nodes.push(temps[j])
			}
		}
		this.elements[i].parentNode.insertBefore(node,nodes[this.index()+1])
	}
	return this;
}
Base.prototype.remove = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].parentNode.removeChild(this.elements[i])
	}
	return this;
}
Base.prototype.empty = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].innerHTML = '';
	}
	this.length = this.elements.length;
	return this;
}
Base.prototype.stopDef = function(event){
	var e = event || window.event;
	window.event ? e.returnValue = false : e.preventDefault();
}
Base.prototype.stopPro = function(event){
	var e = event || window.event;
	window.event ? e.cancelBubble = true : e.stopPropagation();
}
Base.prototype.offset = function(direction){
	for(var i = 0; i < this.elements.length; i++){
		var left = this.elements[i]['offset'+direction];
		var parent = this.elements[i].offsetParent;
		while(parent != null){
			left += parent['offset'+direction];
			parent = parent.offsetParent
		}
		return left;
	}
}


