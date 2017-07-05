Page({
    data:{
        token:'',
        recordList:[]
    },
    onLoad:function(option){
    let app = getApp();
    let that=this;
    wx.getStorage({//获取token
        key: 'token',
        success: function(res) {
            that.setData({
                token:res.data
            })
            wx.request({
                url: app.host + '/api/examRecordList',
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                'content-type': 'application/json',
                'x-auth-token': res.data
                }, // 设置请求的 header
                success: reqRes => {
                    if(reqRes.data.code=="200"){
                        that.setData({
                            recordList:reqRes.data.data,
                        })
                    }else{
                         wx.showModal({
                            title: '后台服务错误',
                            content: reqRes.data.error,
                            showCancel: false,
                            confirmText: '返回',
                            success: res => {
                                if(res.confirm) {
                                    wx.navigateBack({delta: 1})
                                }
                            }
                        })
                    }
                
                },
                fail: e => {
                    wx.showModal({
                        title: '网络访问故障',
                        content: e,
                        showCancel: false,
                        confirmText: '返回',
                        success: res => {
                            if(res.confirm) {
                                wx.navigateBack({delta: 1})
                            }
                        }
                    })
                },
            })
        },
        fail:err =>{//获取token失败
            wx.showModal({
                title: '尚未登录',
                content: '你需要登录才能使用本功能',
                showCancel: false,
                confirmText: '去登录',
                success: res => {
                    if(res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            })
        }
    })
    }
    
})