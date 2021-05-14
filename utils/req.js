<<<<<<< HEAD
const baseUrl = "http://localhost:3000";
=======
const baseUrl = "https://netease-cloud-music-api-lilac-three.vercel.app";
>>>>>>> 5fd85b606b5acafbfbe60361e3cdcb9a6bd1a22c

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
