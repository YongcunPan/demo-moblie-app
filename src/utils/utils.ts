import { useSelector } from 'umi';
import { alertUtil } from '@/utils/message';
import { ponder } from '../pages/ModifyApplication/data';

export function throttle(func, delay) {
  let lastCallTime = 0;
  let timeoutId;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (!lastCallTime || timeSinceLastCall >= delay) {
      func.apply(this, args);
      lastCallTime = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastCallTime = now;
      }, delay - timeSinceLastCall);
    }
  };
}

export function debounce(func, delay = 400) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function baseExtremum(array, iteratee, comparator) {
  var index = -1,
    length = array.length;

  while (++index < length) {
    var value = array[index],
      current = iteratee(value);
    if (
      current != null &&
      (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))
    ) {
      var computed = current,
        result = value;
    }
  }
  return result;
}

export function max(array) {
  return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
}

const isTruthy = (value: any) => {
  return value !== null && value !== undefined && value !== '';
};

export const getFinalGData = (addData: any, v?: any) => {
  if (!isTruthy(v)) {
    if (!addData?.bacStandard) {
      return addData?.isGreen;
    } else {
      if (Reflect.has(addData, 'befInput') && addData?.befInput > 0) {
        return addData.bacStandard >= addData.befInput;
      } else {
        return addData?.isGreen;
      }
    }
  } else {
    return v;
  }
};

export function arrange(a, b, c = 'equipmentCategoryId') {
  if (b?.length === 0) {
    return a;
  }
  const idMap = new Map();
  a.forEach((item) => {
    idMap.set(item[c], item);
  });
  b.forEach((itemB) => {
    const itemA = idMap.get(itemB[c]);
    idMap.set(itemB[c], itemA ? { ...itemA, ...itemB } : itemB);
  });
  return Array.from(idMap.values());
}

export function getLen(limit) {
  let size = '';
  if (limit < 0.1 * 1024) {
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
  let sizeStr = size + '';
  let index = sizeStr.indexOf('.');
  let dou = sizeStr.substr(index + 1, 2);
  if (dou == '00') {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
}

export const PersonnelAuthority = () => {
  const userInfo = useSelector((state: any) => state?.user?.currentUser?.roles);
  //VSSC维保工程师
  const vsscVbUser = userInfo?.some((u: any) => u?.enumNo === 67);
  //VSSC合约工程师
  const vsscHyUser = userInfo?.some((u: any) => u?.enumNo === 71);
  //服务商
  const serverUser = userInfo?.some((u: any) => u?.enumNo === 2);
  //RGM
  const RGMUser = userInfo?.some((u: any) => u?.enumNo === 6);
  //BP
  const BPUser = userInfo?.some((u: any) => u?.enumNo === 69);
  // 改造工程师
  const VSSCmodifyUser = userInfo?.some((u: any) => u?.enumNo === 68);
  // DM
  const DMUser = userInfo?.some((u: any) => u?.enumNo === 0 || u?.enumNo === 15);

  const userObj = { vsscVbUser, vsscHyUser, serverUser, RGMUser, BPUser, userInfo, VSSCmodifyUser, DMUser };

  return userObj;
};

export const getChangeO = (list: any, item: any, type?: any, isChange?: any) => {
  let finalObj = {};
  if (type === 'restaurant') {
    // eslint-disable-next-line no-param-reassign
    list = ['storeName', 'storeCode', 'brandId', 'brandStr', 'marketId', 'marketStr'];
  }
  list.forEach((propertyName: any) => {
    if (type === 'restaurant') {
      finalObj[propertyName] = item?.[propertyName];
      finalObj.marketName = item?.marketStr;
      finalObj.brandName = item?.brandStr;
    } else {
      if (isChange) {
        finalObj[propertyName[1]] = item?.[propertyName[0]];
      } else {
        finalObj[propertyName[0]] = item?.[propertyName[1]];
      }
    }
  });
  return finalObj;
};

export const customS = (item1: any, item2: any, b: any, c = 'Code') => {
  const index1 = b.indexOf(item1[c]);
  const index2 = b.indexOf(item2[c]);

  if (index1 === -1 && index2 === -1) {
    return 0;
  }
  if (index1 === -1) {
    return 1;
  }
  if (index2 === -1) {
    return -1;
  }
  return index1 - index2;
};

export const getMes = (item: any) => alertUtil.error(ponder[item]);



export const getAllUrlParams = (urls:any)=> {
  var url = urls || location.href;
  // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
  var queryString = url
    ? url.split("?")[1]
    : window.location.search.slice(1);
  // 用来存储我们所有的参数
  var obj = {};
  // 如果没有传参，返回一个空对象
  if (!queryString) {
    return obj;
  }
  // stuff after # is not part of query string, so get rid of it
  queryString = queryString.split("#")[0];
  // 将参数分成数组
  var arr = queryString.split("&");
  for (var i = 0; i < arr.length; i++) {
    // 分离成key:value的形式
    var a = arr[i].split("=");
    // 将undefined标记为true
    var paramName = a[0];
    var paramValue = typeof a[1] === "undefined" ? true : a[1];
    if (paramName.match(/\[(\d+)?\]$/)) {
      // 如果paramName不存在，则创建key
      var key = paramName.replace(/\[(\d+)?\]/, "");
      if (!obj[key]) obj[key] = [];
      // 如果是索引数组 e.g. colors[2]
      if (paramName.match(/\[\d+\]$/)) {
        // 获取索引值并在对应的位置添加值
        var index = /\[(\d+)\]/.exec(paramName)[1];
        obj[key][index] = paramValue;
      } else {
        // 如果是其它的类型，也放到数组中
        obj[key].push(paramValue);
      }
    } else {
      // 处理字符串类型
      if (!obj[paramName]) {
        // 如果如果paramName不存在，则创建对象的属性
        obj[paramName] = paramValue;
      } else if (obj[paramName] && typeof obj[paramName] === "string") {
        // 如果属性存在，并且是个字符串，那么就转换为数组
        obj[paramName] = [obj[paramName]];
        obj[paramName].push(paramValue);
      } else {
        // 如果是其它的类型，还是往数组里丢
        obj[paramName].push(paramValue);
      }
    }
  }
  return obj;
}