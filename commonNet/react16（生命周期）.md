Promise是一个构造函数，函数中含all、reject、resolve方法，原型上有then、catch方法。
最简单的例子
const test = new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成');
        resolve('测试用例');
    }, 2000);
});
简单讲解  promise 接收一个函数参数，并且该函数自带resolve和reject两个参数，用于回调完成的操作。
其中resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。

在项目开发中 首先会登录然后做一些操作例如
login()=>{
    return new Promise(resolve=>{
        http.get(url,res=>{
            resolve(res)
        })
    })
}
login().then(checkStatus)
       .then(response => response.json())
       .then(checkError.bind(null, mode))
       .catch(err => ({ err }));
login方法返回一个promise 利用then方法注册在成功时进行回调处理


promise在一定程度上解决回调地狱的问题，下面来简单模拟一个promise实现过程
这个简陋的方法中因为没有状态机制 所以可能会出现resolve比then先执行的情况
function myPromise(fn){
    <!-- 首先要定义一个回调数组 作为成功时的执行 -->
    var callbackArr = []
    <!-- 调用then方法的时候  其实是将then里的参数方法 放入回调数组中 -->
    this.then = function (onFulfilled){
        callbackArr.push(onFulfilled)
    }
    <!-- new Promise时会有不同的状态 resolve时会接受一步操作返回的结果-->
    <!-- resolve方法会把回调数组中的方法一一执行 -->
     function resolve(value) {
        callbackArr.forEach(function (callback) {
            callback(value);
        });
    }

    fn(resolve);
}

现在添加状态机制 解决上面提到的异步问题
function myPromise(fn){
    <!-- 添加等待状态 -->
    var state = 'pedding'
    var callbackArr =[]
    <!-- then返回promise 便于链式遍历-->
    this.then = function(onFulfilled,onRejected){
           return new myPromise(function (resolve,reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected:onRejected||null,
                resolve: resolve,
                reject: reject
            });
        });
    }

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onResolved) {
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }


     function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }

    fn(resolve);
}