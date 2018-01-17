/**
 * Created by lijianxun on 17/11/14.
 * @bluebird Promise.each 类似async的eachSeries是串行执行，不是并行，没有返回值
 */
const Promise = require("bluebird");

function asyncFun1(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return resolve(num);
		},500);
	});
}

//数组不用promise化
const arr= [0, 1, 2, 3, 4];
Promise.each(arr, (it) => {
	return asyncFun1(it);
}).then(() => {
	// 注意没有返回值
	console.log('all done! ');
}).catch((error) => {
	//其中有一个出错就会触发catch，后续的任务将不会再执行
});

// 注意：需要返回值时应该是用Promise.map或Promise.mapSeries，不如不需要返回值，应该是用Promise.each
