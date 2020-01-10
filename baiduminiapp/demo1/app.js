App({
    onLaunch(options) {
        let data = swan.getStorageSync("score");
        if (data) {
            swan.setStorageSync("sign", true);
        }
        else {
            swan.setStorageSync("score", 0);
            swan.setStorageSync("sign", true);
        }
        // this.getLocation()
    },
   getLocation(e) {
        swan.getLocation({
            type: 'gcj02', 
            altitude: true,
            success: res => {
                console.log('success', res);
                swan.openLocation({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    success: res => {
                        console.log('openLocation success', res);
                    },
                    fail : function (err) {
                        console.log('openLocation fail', err);
                    }
                });
            },
            fail: err => {
                swan.showToast({title: '请开启地理位置'});
            },
        });
    }
});
