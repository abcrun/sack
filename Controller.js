/**
* Javascript Controller Module
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/sack.git
* Version - 0.0.1
*/
(function(name,factory){
    if(typeof define === 'function' && define.amd) define(factory);//AMD
    else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
    else this[name] = factory();//Global
})('Controller',function(){
    //Publisher Constructor
    var Publisher = function(publisher){
        this.publisher = publisher || this;
        this.subscribers = [];
    }
    Publisher.prototype = {
        add:function(subscriber){
            var subscribers = this.subscribers;
            for(var i = 0; i < subscribers.length; i++){
                var sub = subscribers[i];
                if(sub == subscriber) return this;
            }
            this.subscribers.push(subscriber);
            return this;
        },
        remove:function(subscriber){
            var subscribers = this.subscribers;
            for(var i = 0; i < subscribers.length; i++){
                var sub = subscribers[i];
                if(sub == subscriber){
                    this.subscribers.splice(i,1);
                    return this;
                }
            }
        },
        deliver:function(data){
            for(var i = 0; i < this.subscribers.length; i++){
                var subscriber = this.subscribers[i];
                subscriber.call(this.publisher,data);
            }
        }
    }

    //event listeners
    var formatEvent = function(event){//format event object
        event.target = event.target || event.srcElement;
        event.keyCode = event.keyCode || event.which;
        event.pageX = event.pageX || document.body.scrollLeft + event.clientX;
        event.pageY = event.pageY || document.body.scrollTop + event.clientY;
        event.preventDefault = event.preventDefault || function(){event.returnValue = false}
        event.stopPropagation = event.stopPropagation || function(){event.cancelBubble = true}
        return event;
    }
    var addListener = function(elm,type,handlers){
        try{
            elm.addEventListener(type,handlers,false);
        }catch(e){
            try{
                elm.attachEvent('on' + type,handlers);
            }catch(e){}
        }
    }
    var removeListener = function(elm,type,handlers){
        try{
            elm.removeEventListener(type,handlers,false);
        }catch(e){
            try{
                elm.detachEvent('on' + type,handlers);
            }catch(e){}
        }
    }
    var events = function(){
        var setNull = function(elm,type){
            removeListener(elm,type,elm['events'][type]['handlers'],false);
            elm['events'][type] = null;
        }
        return{
            bind:function(type,fn){
                for(var i = 0; i < this.elms.length; i++){
                    var elm = this.elms[i];
                    elm['events'] = elm['events'] || {};
                    if(elm['events'][type]) elm['events'][type].add(fn);
                    else{
                        elm['events'][type] = new Publisher(elm).add(fn);
                        elm['events'][type]['handlers'] = function(event){
                            event = formatEvent(event);
                            elm['events'][type].deliver(event);
                        }
                        addListener(elm,type,elm['events'][type]['handlers']);
                    }
                }
                return this;
            },
            unbind:function(type,fn){
                for(var i = 0; i < this.elms.length; i++){
                    var elm = this.elms[i];
                    if(!fn) setNull(elm,type);
                    else{
                        elm['events'][type].remove(fn);
                        if(!elm['events'][type]['subscribers'].length) setNull(elm,type);
                    }
                }
                return this;
            },
            trigger:function(type){
                if(!type) return;
                for(var i = 0; i < this.elms.length; i++){
                    var elm = this.elms[i];
                    elm['events'][type].deliver();
                }
                return this;
            }
        }
    }

    var define = function(arg){
        this.elms = arg.nodeName ? [arg] :
            arg.length && arg[0].nodeName ? arg : 
            null;
    }
    define.prototype = events();
    define.prototype.on = events.bind;
    define.prototype.un = events.unbind;

    var controller = {
        Publisher:Publisher,
        define:function(arg){
            return new define(arg);
        }
    }

    return controller;
})
