/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.all
 */
var Promise = require("bluebird");

//常见的异步含有callback方法，和callback规范的一样callback的第一个参数为error对象，第二个
//参数为返回值
function async_fun1(callback) {
	setTimeout(()=>{
		console.log("方法1结束");
		callback(null, "value1");
	},500);
}

//Promise.fromCallback可以直接把一个callback异步方法，转成一个promise
Promise.fromCallback((cb)=>{
	async_fun1(cb);
})
.then((value)=>{
	//无错误 执行，这个例子执行这
	console.log("value: ", value);
})
.catch((err)=>{
	//有错误会执行
	console.log("value err: ", err);
});

//常见的异步含有callback方法,返回错误的
function async_fun2(callback) {
	setTimeout(()=>{
		console.log("方法2结束");
		callback(new Error("错误了"), null);
	},500);
}

//错误的情况，会进catch
Promise.fromCallback((cb)=>{
	async_fun2(cb);
})
.then((value)=>{
	console.log("value2: ", value);
})
.catch((err)=>{
	//有错误会执行，这个例子执行这
	console.log("value2 err: ", err);
});



