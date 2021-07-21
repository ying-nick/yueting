<<<<<<< HEAD
// const baseUrl = "http://localhost:3000";
const baseUrl = 'https://y-nick.com:3000'

=======
const baseUrl = "https://y-nick.com:3000";
// const baseUrl = 'https://netease-cloud-music-api-lilac-three.vercel.app'
// const baseUrl = 'https://pl-fe.cn/cloud-music-api'
>>>>>>> cde89b83a50afd606dce54d2ae78f84b9ffc5ca1
export function myRequestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: "GET",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}


export function myRequestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
