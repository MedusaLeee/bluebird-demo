/**
 * Created by lijianxun on 16/9/13.
 */
var Promise = require("bluebird");
//无错误的
function async_get_data() {
	return new Promise((resolve, reject) => {
		var data = {name: 1};
		setTimeout(()=> {
			return resolve(data);
		}, 200);
	});
}

async_get_data()
	.then((data)=> {
		console.log('data--', data);
	})
	.catch((e)=> {
		console.log(e);
	});

//有错误的
function async_get_data_with_error() {
	return new Promise((resolve, reject) => {
		let error = new Error("异常啦！");
		setTimeout(()=> {
			return reject(error);
		}, 400);
	});
}

async_get_data_with_error()
	.then((data) => {
		//有异常，不会执行then
		console.log("data--2", data);
	})
	.catch((err) => {
		console.log("error-2", err);
	});

//根据传入参数判断
function async_get_date_with_params(param) {
	return new Promise((resolve, reject)=> {
		setTimeout(()=> {
			if (param === 1) {
				return resolve("成功--" + param);
			} else {
				return reject("异常啦");
			}
		}, 500);
	});
}

var result = async_get_date_with_params();

result
	.then((data)=> {
		console.log('result-data--3', data);
	})
	.catch((error)=> {
		console.log('result-error--3', error);
	});
var result2 = async_get_date_with_params(1);

result2
	.then((data)=> {
		console.log('result2-data--3', data);
	})
	.catch((error)=> {
		console.log('result2-error--3', error);
	});