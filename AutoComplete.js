/**
* AutoComplte Class (Module) - jQuery plugin
* Require: jQuery,Class.js (https://github.com/abcrun/Class)
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/sack.git
* Version - 0.2.2
*/
var getPosition = function(elm,pos){
    var distance = 0;
    while(elm){
        distance += elm[pos];
        elm = elm.offsetParent;
    }
    return distance;
}
var AutoComplete = Class.create({
    constructor:function(obj){
        var temp;
        var input = 'oninput' in window?'input':'keyup';

        this.tip = obj.tip || '请输入关键字';
        this.input = obj.input;
        if(!this.input) return;
        this.input.val(this.tip);

        this.form = obj.form
        if(!this.form && (temp = this.input.parents('form')) && temp.length){
            this.form = temp;
            temp = null;
        }

        this.suggest = obj.suggest;
        if(!this.suggest){
            var div = document.createElement('div'),x = getPosition(this.input[0],'offsetLeft'),y = getPosition(this.input[0],'offsetTop') + this.input.height();
            div.style.cssText = 'position:absolute;top:' + y + 'px;left:' + x + 'px';
            document.body.appendChild(div);
            this.suggest = jQuery(div);
        }
        this.suggest.hide();

        this.list = (obj.list || 'li').toLowerCase();
        this.hover = obj.hover || 'hover';

        this.input.focus(jQuery.proxy(this.focus,this));
        this.input.blur(jQuery.proxy(this.blur,this));
        this.input.keydown(jQuery.proxy(this.keydown,this));
        this.input.bind(input,jQuery.proxy(this.textInput,this));

        if(this.form) this.form.bind('submit',jQuery.proxy(this.submit,this));
        this.suggest.delegate(this.list,'mouseover',jQuery.proxy(this.mouseover,this));
        this.suggest.delegate(this.list,'click',jQuery.proxy(this.click,this));
    },
    focus:function(){
        if(this.input.val() == this.tip) this.input.val('');
    },
    blur:function(){
        var self = this;
        if(this.input.val() == '') this.input.val(this.tip);
        setTimeout(function(){
            self.suggest.hide();
            self.current = null;
        },500)
    },
    click:function(){
        this.input.val(this.current.text());
    },
    submit:function(evt){
        if(this.form) evt.preventDefault();
        this.input.val(this.current.text());
    },
    keydown:function(evt){
        var keyCode = evt.keyCode,tag = this.list,hover = this.hover;
        if(keyCode >= 37 && keyCode <= 40){
            if(!this.suggest.find(tag).length) return;
            evt.preventDefault();

            if(this.current) this.current.removeClass(hover);
            if(keyCode == 37 || keyCode == 38){
                this.current = (!this.current?this.suggest.find(tag).last():(this.current.prev().length?this.current.prev():this.suggest.find(tag).last()))
            }else{
                this.current = (!this.current?this.suggest.find(tag).first():(this.current.next().length?this.current.next():this.suggest.find(tag).first()))
            }
            this.current.addClass(hover);
            this.input.val(this.current.text());
        }else if(keyCode == 13){
            if(!this.form) this.submit();
        }
    },
    getDatas:function(){
        throw new Error('必须包含".getDatas()"这个方法，来用于请求或者输出智能提示的内容');
    },//Abstract Method - get the prompt
    textInput:function(evt){
        var keyCode = evt.keyCode;
        if(!keyCode || ((keyCode >=48 && keyCode <= 90) || (keyCode >=96 && keyCode <= 105) || keyCode == 8 || keyCode == 32 || keyCode == 45)){
            this.getDatas();
        }
    },	
    mouseover:function(evt){
        var target = evt.target;
        while(target && target.nodeName.toLowerCase() != this.list) target = target.parentNode;
        if(target.nodeName.toLowerCase() != this.list) return;
        if(this.current) this.current.removeClass(this.hover);
        this.current = jQuery(target);
        this.current.addClass(this.hover);
    }
});
