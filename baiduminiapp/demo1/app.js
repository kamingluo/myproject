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
    }
});
