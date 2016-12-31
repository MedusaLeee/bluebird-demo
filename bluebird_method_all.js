/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.all
 */
var Promise = require("bluebird");

function async_fun1() {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			console.log("方法1结束");
			resolve("success-1");
		},500);
	});
}

function async_fun2(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			if(num === 1){
				console.log("方法2结束");
				return resolve("success-2");
			}
			console.log("方法2结束");
			return reject("fail-2");
		},300);
	});
}
// .all方法类似async的series，只不过.all是并行执行的不保证顺序，返回的数据和async.series一样是个数组

//无异常的情况
Promise.all([
	async_fun1(),
	async_fun2(1)
]).then((data)=>{
	//data 是个数组  [ 'success-1', 'success-2' ]
	console.log("data--1 ",data);
}).catch((error)=>{
	console.log("error--1 ",error);
});
//使用spread格式化出,spread会把返回的数组对应到参数，如arr = [1,2],使用spread((value1, value2)=>{}),
//则arr[0]会自动赋值给value1, arr[1]会自动赋值给value2，就可以不用和async一样使用数组下标访问了，增加可读性
Promise.all([
	async_fun1(),
	async_fun2(1)
]).spread((value1, value2)=>{
	//value1对应数组一个元素的返回结果，value2对应数组第2个元素的返回结果
	console.log("data--1 ",value1, value2);
}).catch((error)=>{
	console.log("error--1 ",error);
});
//有异常的情况
Promise.all([
	async_fun1(),
	async_fun2(0)
]).then((data)=>{
	console.log("data--1 ",data);
}).catch((error)=>{
	//任何一个异常都会进入catch  输出 fail-2
	console.log("error--1 ",error);
});

