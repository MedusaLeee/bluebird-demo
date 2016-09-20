/**
 * Created by lijianxun on 16/9/13.
 * @bluebird Promise.reduce,既然有map必然有reduce
 */
var Promise = require("bluebird");

function async_sum(num) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			return resolve(1 + num);
		},500);
	});
}

//数组不用promise化
var arr= [0, 1, 2, 3, 4];
//和数组的reduce类似,这里的第一个参数是数组，第二个参数是处理方法，第三个参数是初始值
//第一个total为初始值0，第二个为0+result,第三个为0+result+result...最后的sum为最后的值
Promise.reduce(arr,(total,it)=>{
	console.log("---",total);
	return async_sum(it).then((result)=>{
		return total+result;
	});
},0).then((sum)=>{
	console.log("sum---",sum);
});

Promise.reduce(arr,(total,it)=>{
	console.log("2---",total);
	return total+it;
},0).then((sum)=>{
	console.log("sum2---",sum);
});