

// 判断是否需要遮罩层

export default {
    shadow(_this, cachedViews) {
        let routeName = _this.$route.name
        let dialogNames = JSON.parse(localStorage.getItem('dialogRouteNames')) || []
        if (cachedViews.length && cachedViews.includes(routeName) && dialogNames.includes(routeName)) {
            _this.$Alert.show(routeName)
        } else {
            _this.$Alert.hidden(routeName)
        }
    }
}