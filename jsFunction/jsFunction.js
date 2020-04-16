function createNew(){
    let object = {};//建立空对象

    let constructor = [].shift.call(arguments) //拿第一个参数，也就是源对象

    object.__proto__ = constructor.ProtoType; //object的原型链，链接到源对象的原型上

    let result = constructor.apply(object,arguments);//绑定this 到object

    return typeof result === "object" ? result : object ;
}

class myPromise{
    constructor(fn){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        let resolve = value =>{
            if (this.state === 'pending'){
                this.state = 'fulfilled',
                this.value = value
            }
        }
        let reject = value =>{
            if (this.state === 'pending'){
                this.state = 'rejected'
                this.reason = value
            }
        }
        try {
            fn(resolve, reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled, onRejected){
        // console.log('this.state ',this.state)
        switch (this.state) {
            case 'fulfilled':
                // console.log('value ',this.value)
                onFulfilled(this.value)
                break;
            case 'rejected':
                onRejected(this.value)
                break;
            default:
        }
    }
}

// function myPromise(executor){ //executor执行器
//     let self = this;
//     self.status = 'pending'; //等待态
//     self.value  = undefined; // 表示当前成功的值
//     self.reason = undefined; // 表示是失败的值
//     function resolve(value){ // 成功的方法
//         if(self.status === 'pending'){
//             self.status = 'resolved';
//             self.value = value;
//             console.log('value ',value)
//         }
//     }
//     function reject(reason){ //失败的方法
//         if(self.status === 'pending'){
//             self.status = 'rejected';
//             self.reason = reason;
//         }
//     }
//     executor(resolve,reject);
// }

// myPromise.prototype.then = function(onFufiled,onRejected){
//     let self = this;
//     console.log('aaaa')
//     console.log('self.status ',self.status)
//     if(self.status === 'resolved'){
//         console.log('self.value',self.value)
//         onFufiled(self.value);
//     }
//     if(self.status === 'rejected'){
//         onRejected(self.reason);
//     }
// }

Function.prototype.mycall = function(context){
    ////////判断调用的是否为函数
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }
    
    context = context || window;//判断转换this的目标是否存在,不存在转为window
    context.fn = this;//函数方法赋值给转换this值后的作用域

    let arg = [...arguments].slice(1);//从第二个参数开始读取
    let result = context.fn(...arg);//将读取的参数放到新的作用域中的方法中，返回结果

    delete context.fn;
    return result;
}

Function.prototype.myapply = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }
    context = context || window;
    context.fn = this;

    if(arguments[1]){
        var arg = [...arguments].slice(1)
        var result = context.fn(...arg[0]) 
    }else{
        var result = context.fn()
    }

    delete context.fn
    return result   
}

Function.prototype.mybind = function(context){
    if (typeof this !== 'function'){
        throw new TypeError('Error')
    }

    let _this = this;
    let arg = [...arguments].slice(1);

    return function(){
        
        return _this.apply(context,arg.concat(...arguments))
        
    }
}

function deepClone(obj){
    let copy = obj instanceof Array ? [] : {}
    console.log(copy)
    for(let i in obj){
        console.log('obj.hasOwnProperty(i)',obj.hasOwnProperty(i))
        if(obj.hasOwnProperty(i)){
            copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]):obj[i]
        }
    }
    return copy
}