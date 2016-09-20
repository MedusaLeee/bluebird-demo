/**
 * Created by lijianxun on 16/9/13.
 */
var Promise = require("bluebird");

function async_func1(name) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			switch (name){
				case "tom":
					return resolve({name: name,age: 26});
				case "jack":
					return resolve({name: name,age: 30});
				default:
					return reject("无此用户信息");
			}
		},200);
	});
}

function async_func2(userObj) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			if(userObj.age === 26){
				userObj.role = "student";
				return resolve(userObj);
			}else{
				userObj.role = "teacher";
				return resolve(userObj);
			}
		},300);
	});
}
//无异常调用
async_func1("tom")
	.then((userObj)=>{
		return async_func2(userObj);
	})
	.then((userObj)=>{
		console.log("userObj--",userObj);
	})
	.catch((error)=>{
		console.log("error--1 ",error);
	});

//有异常调用
async_func1("none")
	.then((userObj)=>{
		return async_func2(userObj);
	})
	.then((userObj)=>{
		console.log("userObj--",userObj);
	})
	.catch((error)=>{
		console.log("error--1 ",error);
	});
