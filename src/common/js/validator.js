/* 是否手机号码*/
export function validatePhone(rule, value,callback) {
  const reg =/^[1][3,4,5,7,8,9][0-9]{9}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  }
}

/* 是否邮箱*/
export function validateEMail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱地址'));
    } else {
      callback();
    }
  }
}

// 验证密码
export function validatePassword(rule, value,callback){
	const reg =/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）――+|{}【】‘；：”“'。，、？]){6,20}$/;
	if(value==''||value==undefined||value==null){
	  callback();
	}else{
	  if (!reg.test(value)){
	    callback(new Error('请输入6-20位的密码'));
	  } else {
	    callback();
	  }
	}
}
// 验证身份证号
export function validateIdCard (rule, value, callback) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
	  callback(new Error('请输入正确的身份证号'))
    } else {
	  callback()
    }
  }
}

/* 验证交易密码6位数 */
export function validateTradePassword (rule, value, callback) {
  const reg = /^[0-9]{6}$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('交易密码位6位数字'))
    } else {
      callback()
    }
  }
}


// 是否是企业统一信用代码
export function validateCreditCode(rule,value,callback){
	const reg =/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/;
	if(value==''||value==undefined||value==null){
	  callback();
	}else{
	  if (!reg.test(value)){
	    callback(new Error('请输入正确的企业统一社会信用代码'));
	  } else {
	    callback();
	  }
	}
}

// 验证银行卡号
export function validateBankNo (rule, value, callback) {
  const reg = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18}|\d{19})$/
  if (value == '' || value == undefined || value == null) {
	  callback()
  } else {
	  if (!reg.test(value)) {
	    callback(new Error('请输入正确的银行卡号'))
	  } else {
	    callback()
	  }
  }
}
// 是否是固定号码
export function validateFixPhone (rule, value, callback) {
  const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  if (value == '' || value == undefined || value == null) {
	  callback()
  } else {
	  if (!reg.test(value)) {
	    callback(new Error('请输入正确的固定电话'))
	  } else {
	    callback()
	  }
  }
}

// 以下内容暂无使用
/*验证内容是否英文数字以及下划线*/
export function isPassword(rule, value, callback) {
  const reg =/^[_a-zA-Z0-9]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  } else {
    if (!reg.test(value)){
      callback(new Error('密码仅由英文字母，数字以及下划线组成'));
    } else {
      callback();
    }
  }
}

/*自动检验数值的范围*/
export function checkMax20000(rule, value, callback) {
  if (value == '' || value == undefined || value == null) {
    callback();
  } else if (!Number(value)) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else if (value < 1 || value > 20000) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else {
    callback();
  }
}

//验证是否1-99之间
export function isOneToNinetyNine(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[1-9][0-9]{0,1}$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数，值为【1,99】'));
      } else {
        callback();
      }
    }
  }, 0);
}

// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 0);
}

// 验证是否整数,非必填
export function isIntegerNotMust(rule, value, callback) {
  if (!value) {
    callback();
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 1000);
}

// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入[0,1]之间的数字'));
    } else {
      if (value < 0 || value > 1) {
        callback(new Error('请输入[0,1]之间的数字'));
      } else {
        callback();
      }
    }
  }, 100);
}

// 验证是否是[1-10]的小数,即不可以等于0
export function isBtnOneToTen(rule, value, callback) {
  if (typeof value == 'undefined') {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数，值为[1,10]'));
    } else {
      if (!(value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9' || value == '10')) {
        callback(new Error('请输入正整数，值为[1,10]'));
      } else {
        callback();
      }
    }
  }, 100);
}

// 验证是否是[1-100]的小数,即不可以等于0
export function isBtnOneToHundred(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入整数，值为[1,100]'));
    } else {
      if (value < 1 || value > 100) {
        callback(new Error('请输入整数，值为[1,100]'));
      } else {
        callback();
      }
    }
  }, 100);
}

// 验证是否是[0-100]的小数
export function isBtnZeroToHundred(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入[1,100]之间的数字'));
    } else {
      if (value < 0 || value > 100) {
        callback(new Error('请输入[1,100]之间的数字'));
      } else {
        callback();
      }
    }
  }, 100);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
