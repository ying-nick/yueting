const baseUrl = "http://1.15.157.130";

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
