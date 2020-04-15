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
        console.log('this.state ',this.state)
        switch (this.state) {
            case 'fulfilled':
                console.log('value ',this.value)
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


