/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.props
 */
var Promise = require("bluebird");

function async_fun1() {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve("success-1");
		},200);
	});
}

function async_fun2(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			if(num === 1){
				return resolve("success-2");
			}
			return reject("fail-2");
		},500);
	});
}
// .props方法类似.all方法，不同的是.all接收的参数是数组，.props接收的是对象

var props = {
	fun1: async_fun1(),
	fun2: async_fun2(1)
};
//无异常的情况
Promise
	.props(props)
	.then((data)=>{
		//data也是个对象   { fun1: 'success-1', fun2: 'success-2' }
		console.log("data--1 ",data);
	}).catch((error)=>{
		console.log("error--1 ",error);
	});
