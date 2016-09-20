/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.map&mapSeries 类似async的map&mapSeries
 */
var Promise = require("bluebird");

function async_sum(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return resolve("success--"+ (1 + num));
		},500);
	});
}

//数组不用promise化
var arr= [0, 1, 2, 3, 4];
//map和mapSeries的区别 一个并行执行一个顺序执行，和async一样
Promise.map(arr,(it)=>{
	return async_sum(it);
}).then((result)=>{
	//result是个数组，输出  [ 'success--1','success--2','success--3','success--4','success--5' ]
	console.log('result--1 ',result);
}).catch((error)=>{
	//和async.map一样一个出错就会触发catch
});

//mapSeries
Promise.mapSeries(arr,(it)=>{
	return async_sum(it);
}).then((result)=>{
	//result是个数组，输出  [ 'success--1','success--2','success--3','success--4','success--5' ]
	console.log('result--2 ',result);
}).catch((error)=>{
	//和async.mapSeries一样一个出错就会触发catch
});
