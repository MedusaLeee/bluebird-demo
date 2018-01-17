/**
 * Created by lijianxun on 2017/11/23.
 * @bluebird Promise.any的用法
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
//数组中有任何一个执行成功（resolve）就不再执行后面的
Promise.any(arr).then((result)=>{
	//返回第一个正确的reslove的方法的返回值
	console.log('result--1 ',result);
}).catch(Promise.AggregateError, (err) => {
	//出错的话返回的是个聚合错误的数组
	console.log(err.length);
	err.forEach((e) => {
		console.error(e);
	});
});

// 如果前两个function错误
var fun4 = async_sum_with_error(1);
var fun5 = async_sum_with_error(2);
var fun6 = async_sum(3);
var arr = [fun4, fun5, fun6];
//数组中有任何一个执行成功（resolve）就不再执行后面的,前两个fun4,fun5方法reject所以直到
//执行到fun6才会返回，fun6的值
Promise.any(arr).then((result)=>{
	//返回第一个正确的reslove的方法的返回值
	console.log('result--2 ',result);
}).catch(Promise.AggregateError, (err) => {
	//出错的话返回的是个聚合错误的数组
	console.log(err.length);
	err.forEach((e) => {
		console.error(e);
	});
});

// 如果全部错误
var fun7 = async_sum_with_error(1);
var fun8 = async_sum_with_error(2);
var fun9 = async_sum_with_error(3);
var arr = [fun7, fun8, fun9];
//数组中有任何一个执行成功（resolve）就不再执行后面的,前两个fun4,fun5方法reject所以直到
//执行到fun6才会返回，fun6的值
Promise.any(arr).then((result)=>{
	console.log('result--3 ',result);
}).catch(Promise.AggregateError, (err) => {
	//出错的话返回的是个聚合错误的数组
	console.log(err.length);
	err.forEach((e) => {
		console.error(e);
	});
});