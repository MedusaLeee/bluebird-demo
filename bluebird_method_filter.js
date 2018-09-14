/**
 * Created by lijianxun on 2018/09/14.
 * @bluebird Promise.filter 是并行执行的 concurrency 可以设置并行执行个数
 */
const Promise = require("bluebird");

function asyncFun1(num) {
	return new Promise((resolve, reject)=>{
		console.log(num);
		setTimeout(()=>{
			return resolve(num);
		}, 3000);
	});
}

//数组不用promise化
const arr= [0, 1, 2, 3, 4];
Promise.filter(arr, async (it) => {
	return await asyncFun1(it);
}, { concurrency: 2 }).then((arr) => { // concurrency: 2  并行个数为 2
	// 注意没有返回值
	console.log('all done! ', arr);
}).catch((error) => {
	//其中有一个出错就会触发catch，后续的任务将不会再执行
});
