//浏览器版本检测
(function(){
  window.sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/firefox\/[\d.]+/)) ? sys.firefox = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1]:0;
})()
//检测是否存在class
function hasClass(elements,className){
  var str = new RegExp('(\\s|^)'+className+'(\\s|$)');
  return str.test(elements.className)
}
//获取元素样式
function getStyle(element,attr){
  if (typeof window.getComputedStyle != 'undefined') {
    return window.getComputedStyle(element,null)[attr]
  }else if (typeof element.currentStyle != 'undefined') {
    return element.currentStyle[attr]
  }
}
//添加事件
function addEvent (obj,type,fn) {
  if (obj.addEventListener) {
    obj.addEventListener(type,fn,false)
  }else{
    //第一次调用创建一个存放事件的容器，这个容器是对象
    //如果当前对象存在就不用重创建
    if (!obj.events) {
      obj.events = {};
    }
    //把第一次的事件存放到对象中，并赋值一个新数组
    if (!obj.events[type]) {
      obj.events[type] = [];
      //把第一次的事件存放到数组的第一位
      if (obj['on'+type]) {
        obj.events[type][0] = fn;
      }
    }else{
      //对相同的事件事件注册进行屏蔽
      for(var j in obj.events[type]){
        if (obj.events[type][j] == fn) {
          return;
        }
      }
    }

    //把后面添加的事件依次添加到数组
    obj.events[type].push(fn);
    obj['on'+type] = function (event){
      var e = event || window.event;
      for (var i in obj.events[type]) {
        obj.events[type][i].call(this,e)
      }
    }
  }
}
//删除事件
function removeEvent (obj,type,fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(type,fn,false)
  }else{
    for(var i in obj.events[type]){
      if (obj.events[type][i] = fn) {
        delete obj.events[type][i]
      }
    }
  }
}
//阻止冒泡
function stopPro(){
  var e = event || window.event;
  window.event ? e.cancelBubble = true : e.stopPropagation();
}
//阻止默认事件
function stopDef(){
  var e = event || window.event;
  window.event ? e.returnValue = false : e.preventDefault();
}
//设置cookie
function setCookie(attr,val,date){
	document.cookie = encodeURIComponent(attr)+'='+encodeURIComponent(val)+';expires='+date;
	if(date instanceof Date){
	  document.cookie += (';expires='+date)
	}
}
//获取cookie
function getCookie(attr){
	var value = null;
	var temps = document.cookie.split(';');
	for (var i = 0; i < temps.length; i++) {
	  value = temps[i].split('=');
	  if(value[0] == attr){
		return value[1]
	  }
	}
}
//删除cookie
function removeCookie(name){
		  setCookie(name,'1',-1)
		}
//offset
function offset(element,direction){
	var left = element[direction];
	var parent = element.offsetParent;
	while(parent != null){
		left += parent[direction];
		parent = parent.offsetParent
	}
	return left;
}


