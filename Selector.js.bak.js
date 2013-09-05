/**
* Javascript Selector Module
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/honeycomb.git
* Version - 0.0.1
*/
(function(name,factory){
	if(typeof define === 'function' && define.amd) define(factory);//AMD
	else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
	else this[name] = factory();//Global
})('$',function(){
	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	var whitespace = '[\\x20\\t\\r\\n\\f]';
	// http://www.w3.org/TR/css3-syntax/#characters
	var characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+';
	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	var	identifier = characterEncoding.replace( 'w', 'w#' );

	var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

	
	//Thanks for Sizzle.js
	var sDiv = document.createElement('div');
	div.id = temp_id;
	div.innerHTML = '<div class="a"></div><div class="a i"></div>';
	var surport = {
		getElementById:function(){
		},
		getElementsByTagName:function(){
		},
		getElementsByClassName:function(){
		}
	}


	var _$ = function(selector){
	}
	_$.prototype = {
		parent:function(){
			var elm = this.elms[0];
			return elm.parentNode;
		},
		parents:function(selector){
			var elm = this.elms[0],id = ID.exec(selector),cl = CLASS.exec(selector);
			var find = function(attr,value){
				while(elm){
					if(elm[attr] == value) return elm;
					elm = elm.parentNode;
				}
			}
			if(id) find('id',id[1]);
			else if(cl) find('className',cl[1]);
			else find('nodeName',selector);
		},
		children:function(){
			var elm = this.elms[0];
			return elm.children;
		},
		next:function(){
			var elm = this.elms[0].nextSibling;
			if(!elm) return null;
			while(elm.nodeName == '#text'){
				elm = elm.nextSibling;
			}
			return elm;
		},
		prev:function(){
			var elm = this.elms[0].previousSibling;
			if(!elm) return null;
			while(elm.nodeName == '#text'){
				elm = elm.previousSibling;
			}
			return elm;
		},
		eq:function(i){
			return this.elms[i];
		},
		first:function(){
			return this.elms[0];
		},
		last:function(){
			var last = this.elms.length - 1;
			return this.elms[last];
		},
		find:function(selector){
			var elms = this.elms[0].getElementsByTagName('*'),id = ID.exec(selector),cl = CLASS.exec(selector),results = [];
			var check = function(attr,value){
				return this[attr] == value;
			}
			for(var i = 0; i < elms.length; i++){
				var elm = elms[i],result;
				if(id) result = check.call(elm,id[1],selector);
				else if(cl) result = check.call(elm,cl[1],selector);
				else result = check.call(elm,elm.nodeName,selector); 

				if(result) results.push(elm);
			}
			return results;
		}
	}
})
