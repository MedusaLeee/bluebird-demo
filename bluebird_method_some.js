/**
 * Created by lijianxun on 16/9/17.
 * @bluebird Promise.some的用法
 */
var Promise = require("bluebird");

function async_sum(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return resolve("success--"+ (1 + num));
		},500);
	});
}

function async_sum_with_error(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return reject("error--"+ (1 + num));
		},500);
	});
}
var fun1 = async_sum(1);
var fun2 = async_sum(2);
var fun3 = async_sum(3);
var arr = [fun1, fun2, fun3];
//第一参数是要执行的数组，第二个参数是数组中执行正确的返回值的个数
//设第二个参数为param2，如果有param2个数组内方法正确返回，数组内其他的方法不再执行
Promise.some(arr,1).then((result)=>{
	//result的长度为1
	console.log('result--1 ',result);
}).catch(Promise.AggregateError, function(err) {
	//出错的话返回的是个聚合错误的数组
	err.forEach(function(e) {
		console.error(e.stack);
	});
});

Promise.some(arr,3).then((result)=>{
	//result的长度为3
	console.log('result--2 ',result);
}).catch(Promise.AggregateError, function(err) {
	//出错的话返回的是个聚合错误的数组
	err.forEach(function(e) {
		console.error(e.stack);
	});
});

var fun1 = async_sum(1);
var fun2 = async_sum_with_error(2);
var fun3 = async_sum_with_error(3);
var arr2 = [fun1, fun2, fun3];
//设第二个参数为param2，如果有param2个数组正确返回，数组内其他的方法不再执行，如果不够param2个方法执行成功
//将会继续执行，错误会是个AggregateError对象
Promise.some(arr2,2).then((result)=>{
	//result的长度为2
	console.log('result--3 ',result);
}).catch(Promise.AggregateError, function(err) {
	//出错的话返回的是个聚合错误的数组
	console.log(err.length);
	err.forEach(function(e) {
		console.error(e);
	});
});