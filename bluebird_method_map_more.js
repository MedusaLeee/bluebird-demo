/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.map&mapSeries的高级用法
 */
var Promise = require("bluebird");

function async_sum(num1,num2) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return resolve([num1+1, num2+2]);
		},500);
	});
}

//可在链式调用中使用，当做Array.map或foreach使用
async_sum(1,2)
	.mapSeries((it)=>{
		console.log('mapSeries--'+it);
	})
	.then((result)=>{
		console.log('result--mapSeries执行完毕');
	});

async_sum(1,2)
	.map((it)=>{
		console.log('map--'+it);

	})
	.then((result)=>{
		console.log('result--map执行完毕');
	});


