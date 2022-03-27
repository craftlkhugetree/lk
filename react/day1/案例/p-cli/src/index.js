import '@/css/test'
import img from '@/assets/p1.png'
console.log(img)
console.log(1222)
let p = new Promise((resolve,reject) => {
	setTimeout(() => {
		resolve('h')
	},2000)
})
p.then(res => {
	console.log(res)
})
let arr = [1,2,3]
arr.map((item,index) => {
	return item
})
document.querySelector('#img').src = img