class Utils {
    /**
     * 过滤后面有逗号的图片
     * @param {*} data
     */
    dealImage(data) {
        if (!data) return []
        let imageLists = data.split('#')
        return imageLists.map(item => {
            return item.split(',')[0]
        })
    }
    /**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time)
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    }

    // 获取当前时间年月日
    
    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? '0' + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1
      let date =
        new Date(timeStamp).getDate() < 10
          ? '0' + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate()
      let hh =
        new Date(timeStamp).getHours() < 10
          ? '0' + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours()
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? '0' + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes()
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? '0' + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds()
      return year + '-' + month + '-' + date
    }



    /**
     * @param {number} time
     * @param {string} option
     * @returns {string}
     */
    formatTime(time, option) {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000
        } else {
            time = +time
        }
        const d = new Date(time)
        const now = Date.now()

        const diff = (now - d) / 1000

        if (diff < 30) {
            return '刚刚'
        } else if (diff < 3600) {
            // less 1 hour
            return Math.ceil(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
        if (option) {
            return parseTime(time, option)
        } else {
            return (
                d.getMonth() +
                1 +
                '月' +
                d.getDate() +
                '日' +
                d.getHours() +
                '时' +
                d.getMinutes() +
                '分'
            )
        }
    }
}

export default new Utils()
