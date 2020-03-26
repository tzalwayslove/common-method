import { parse, stringify } from 'qs';

import RondsCustomEvent from './Event';
import cloneDeep from 'lodash/cloneDeep';
import { getLocale } from 'locale';
import moment from 'moment';

const devtypelist = [2, 546, 547];

export function getFromLS(key) {
  let ls;
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key));
    } catch (e) {
      /*Ignore*/
      ls = {};
    }
  }
  return ls;
}

/*
 * formatInt(s,type)
 * 功能：金额按千位逗号分割
 * 参数：s，需要格式化的数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */

export function formatInt(s, type = 0) {
  if (/[^0-9\.]/.test(s)) return '0';
  if (s === null || s === '') return '0';
  s = s.toString().replace(/^(\d*)$/, '$1.');
  s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
  s = s.replace('.', ',');
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) s = s.replace(re, '$1,$2');
  s = s.replace(/,(\d\d)$/, '.$1');
  if (type === 0) {
    // 不带小数位(默认是有小数位)
    var a = s.split('.');
    if (a[1] === '00') {
      s = a[0];
    }
  }
  return s;
}

export function removeFromLS(key) {
  if (global.localStorage) {
    global.localStorage.removeItem(key);
  }
}

export function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value));
  }
}
export const getAlarmColorByLevel = alarmLevel => {
  const defalutColor = '#00CA2D';
  const colors = ['#00CA2D', '#47a0ff', '#ff8f42', '#b55bfe', '#ff3838'];
  try {
    return colors[alarmLevel];
  } catch (e) {
    return defalutColor;
  }
};

/**
 * 根据报警等级获取颜色
 * @param {*} alarmLevel
 * @param {*} isArr
 * @param {*} hasNormal
 */
export const getAlarmColor = (alarmLevel, isArr = false, hasNormal = false) => {
  const defalutColor = '#00CA2D';
  const colors = ['#00CA2D', '#47a0ff', '#ff8f42', '#b55bfe', '#ff3838'];
  if (isArr) {
    if (hasNormal) {
      return colors;
    } else {
      return ['#47a0ff', '#ff8f42', '#b55bfe', '#ff3838'];
    }
  }
  try {
    return colors[alarmLevel];
  } catch (e) {
    return defalutColor;
  }
};

/**
 * 日期加减
 *
 * @param {any} interval 加减的单位
 * @param {any} number 加减数
 * @param {any} date 日期
 * @returns 日期
 */
export function DateAdd(interval, number, date) {
  switch (interval.toLowerCase()) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number);
      return date;
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3);
      return date;
    }
    case 'm': {
      date.setMonth(date.getMonth() + number);
      return date;
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7);
      return date;
    }
    case 'd': {
      date.setDate(date.getDate() + number);
      return date;
    }
    case 'h': {
      date.setHours(date.getHours() + number);
      return date;
    }
    case 'min': {
      date.setMinutes(date.getMinutes() + number);
      return date;
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number);
      return date;
    }
    default: {
      date.setDate(date.getDate() + number);
      return date;
    }
  }
}
/**
 * 获取设备状态
 * @param {*} code
 * @param {*} isArr
 */
export const getSimpleDevStateColor = code => {
  const defalutColor = '#00CA2D';
  const colors = ['#00CA2D', '#ff8f42', '#b55bfe', '#ff3838'];
  try {
    return colors[code];
  } catch (e) {
    return defalutColor;
  }
};
/**
 * 获取设备状态
 * @param {*} code
 * @param {*} isArr
 */
export const getDevStateColor = (code, isArr = false) => {
  const defalutColor = '#00CA2D';
  const colors = ['#00CA2D', '#ff8f42', '#b55bfe', '#ff3838'];
  if (isArr) {
    return colors;
  }
  try {
    return colors[code];
  } catch (e) {
    return defalutColor;
  }
};

export const getChartColor = [
  '#55aeff',
  '#f4b082',
  '#4addaf',
  '#ff6969',
  '#61e1f2',
  '#ff9a2d',
  '#9283ff',
  '#f3a7f9',
  '#b5b5b5',
  '#a1ef84',
  '#e166ff',
  '#fcf27a',
  '#446dfd',
  '#ac35ff',
  '#00b77e',
  '#ff3030',
  '#26afb8',
  '#ecdb13',
];
/**
 *
 * 获取窗口大小
 *
 * @export
 * @returns
 */
export function getWindowHeight() {
  return window.innerHeight - 104;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData, containSelf = false) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && (containSelf || routePath !== path)
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getUrlParamValue(name) {
  var quertObj = parse(window.location.href.split('?')[1]);
  if (quertObj && quertObj[name]) {
    return quertObj[name];
  } else {
    return null;
  }
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  let data = cloneDeep(array);
  let result = [];
  let hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    //    if (item.id != item.pid) {

    let hashVP = hash[item[pid]];
    // 节点id为000的是根节点
    if (hashVP && item[pid] !== item[id] && item[pid] !== '00000000-0000-0000-0000-000000000000') {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
    // }
  });
  return result;
}

//废弃
export function arrayToTreeWithSort_DeviceId(
  array,
  id = 'id',
  pid = 'pid',
  children = 'children',
  seq = 'seq'
) {
  const result = arrayToTreeWithSort(array, id, pid, children, seq);

  for (let i = 0; i < result.length; i++) {
    CTEChild(result[i], '', '');
  }
  return result;
}

function CTEChild(item, deviceId, deviceType) {
  if (devtypelist.indexOf(item.type) >= 0) {
    deviceId = item.id;
    deviceType = item.type;
  }
  item.deviceId = deviceId;
  item.deviceType = deviceType;
  if (item.children && item.children.length > 0) {
    for (let i = 0; i < item.children.length; i++) {
      CTEChild(item.children[i], deviceId, deviceType);
    }
  }
  return;
}

export function ArrayToTree_DeviceId(
  array,
  id = 'id',
  pid = 'pid',
  children = 'children',
  seq = 'seq'
) {
  let data = array.concat([]);
  let result = [];
  let hashParent = {};
  let Root = [];
  for (let index = 0, length = data.length; index < length; index++) {
    if (
      !data[index][pid] ||
      data[index][id] === data[index][pid] ||
      data[index]['depth'] === 1 || //后台已处理没有根节点的情况
      data[index][pid] === '00000000-0000-0000-0000-000000000000'
    ) {
      Root.push(data[index]);
    }
    // hash[data[index][id]] = data[index];
    if (data[index][pid] !== data[index][id]) {
      //如果当前的pid和id相等不加入进去
      if (hashParent[data[index][pid]]) {
        hashParent[data[index][pid]].push(data[index]);
      } else {
        hashParent[data[index][pid]] = [data[index]];
      }
    }
  }
  Root = Root.sort((a, b) => {
    return a[seq] - b[seq];
  });
  for (let i = 0, length = Root.length; i < length; i++) {
    CTE(Root[i], '', '', '', hashParent, seq, children, pid, id);
    result.push(Root[i]);
  }
  return result;
}

function CTE(item, deviceId, deviceType, devicePath, hashParent, seq, children, pid, id) {
  if (devtypelist.indexOf(item.type) >= 0) {
    deviceId = item.id;
    deviceType = item.type;
    devicePath = item.path;
  }
  item.deviceId = deviceId;
  item.deviceType = deviceType;
  item.devicePath = devicePath;
  let childrenArr = hashParent[item[id]];
  if (childrenArr) {
    childrenArr = childrenArr.sort((a, b) => {
      return a[seq] - b[seq];
    });
    item[children] = childrenArr;
    for (let i = 0; i < childrenArr.length; i++) {
      if (childrenArr[i].id !== item[id]) {
        CTE(childrenArr[i], deviceId, deviceType, devicePath, hashParent, seq, children, pid, id);
      }
    }
  }
  return;
}
/**
 * 数组格式转树状结构 增加排序
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTreeWithSort(
  array,
  id = 'id',
  pid = 'pid',
  children = 'children',
  seq = 'seq'
) {
  let data = cloneDeep(array);
  let result = [];
  let hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    //    if (item.id != item.pid) {

    let hashVP = hash[item[pid]];
    // 节点id为000的是根节点
    if (hashVP && item[pid] !== item[id] && item[pid] !== '00000000-0000-0000-0000-000000000000') {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
      hashVP[children].sort((a, b) => {
        return a[seq] - b[seq];
      });
    } else {
      result.push(item);
    }
    // }
  });
  return result;
}
/**
 * 整型数组之和
 * @param {*} arr
 */
export function ArrayInt_sum(arr) {
  var suml = 0;
  for (var i = 0; i < arr.length; i++) {
    suml += arr[i];
  }
  return suml;
}
export function ExportExcel(data, title2, downloadFileName, notDownloadColumns = []) {
  // let data = this.props.table.dataSource;
  // let title = this.props.table.columns;
  let result = [];
  let subTitle = [];
  let title = [];
  title2.map(function(val, index) {
    if (notDownloadColumns.indexOf(val.name) === -1 && val.tableItem) {
      subTitle.push(val.title);
      title.push(val);
    } else if (val.children) {
      val.children.map(c => {
        if (notDownloadColumns.indexOf(c.name) === -1 && c.tableItem) {
          subTitle.push(val.title + '_' + c.title);
          title.push(c);
        }
      });
    }
    return false;
  });

  data.map(function(value, index) {
    let content = [];
    title.map(function(val, index) {
      if (notDownloadColumns.indexOf(val.name) === -1) {
        if (val.tableItem.textContent) {
          //为了数字时间等正确显示及英文,和所包含的\n
          content.push(`"${val.tableItem.textContent(value[val.name], value) || ''}"\t`);
        } else {
          let str = '';
          //这里会有0 直接！会导致0导出为空

          if (
            value[val.name] !== null &&
            value[val.name] !== undefined &&
            value[val.name] !== 'undefined' &&
            value[val.name] !== 'null'
          ) {
            str = value[val.name];
          }
          content.push(`"${str}"\t`);
        }
      }
      return false;
    });
    result.push(content);
    // return;
  });
  result.unshift(subTitle);
  let csvContent = '';
  if (window.navigator.msSaveOrOpenBlob) {
    csvContent = '\ufeff';
  }
  result.forEach(function(infoArray, index) {
    let dataString = infoArray.join(',');
    csvContent += index < data.length ? dataString + '\n' : dataString;
  });
  if (window.navigator.msSaveOrOpenBlob) {
    // if browser is IE
    let blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: 'text/csv;charset=utf-8;',
    });
    window.navigator.msSaveBlob(blob, downloadFileName + '.csv');
  } else {
    let csvUrl = '';
    if (typeof Blob !== 'undefined') {
      csvContent = '\uFEFF' + csvContent;
      let csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      csvUrl = URL.createObjectURL(csvData);
    } else {
      csvContent = 'data:text/csv;charset=utf-8,\ufeff' + csvContent;
      csvUrl = encodeURI(csvContent);
    }
    let link = document.createElement('a');
    link.setAttribute('href', csvUrl);
    link.setAttribute('download', downloadFileName + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * 是否为function
 * @param {any} val
 */
export function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]';
}

/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * @param func 执行函数
 * @param wait 时间间隔
 * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
 *                如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns {Function}
 */
export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  if (!func) {
    return;
  }
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = new Date().getTime() - timestamp; // timestamp会实时更新

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * 添加一个面板
 * @param key
 * @param title
 * @param component
 * @param icon
 * @constructor
 */
export function AddTab(key, title, component, icon, forceUpdate = false, isNext = true,obj={height:'50vh'}) {
  RondsCustomEvent.fireEvent('addTabs', {
    key: key,
    title: title,
    component: component,
    icon: icon,
    forceUpdate: forceUpdate,
    isNext: isNext,
    ...obj,
  });
}

export function removeTab(key) {
  RondsCustomEvent.fireEvent('removeTab', key);
}

/**
 * @return {string}
 */
export function NewGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 *向父页面发送命令
 *
 * @param {*} type
 * @param {*} data
 */
export const sendMessage = function(type, data) {
  const postData = { type: type, data: data };
  window.parent.postMessage(JSON.stringify(postData), '*');
};

/**
 * 华能要求导出路径需要分割开来，函数将原始columns改变来得到结果
 * @param {原本的columns} columns
 * @param {路径字段，默认是path} name
 * @param {统一用path分割之后的设备（机组名称），这一列表示删除原本资产列}
 */
export function GetExportColumns(columns, name = 'path', deleteColumns = 'assetname') {
  let newColumns = [];
  columns.map(item => {
    if (item.name === name) {
      let temp = [
        {
          title: '区域',
          name: name,
          tableItem: {
            width: 180,
            render: (val, record) => <span>{val}</span>,
            textContent: text => {
              text = text.split('\\')[1] || '';
              return text;
            },
          },
          formItem: {},
        },
        {
          title: '风场',
          name: name,
          tableItem: {
            width: 180,
            render: (val, record) => <span>{val}</span>,
            textContent: text => {
              text = text.split('\\')[2] || '';
              return text;
            },
          },
          formItem: {},
        },
        {
          title: '机组名',
          name: name,
          tableItem: {
            width: 180,
            render: (val, record) => <span>{val}</span>,
            textContent: text => {
              text = text.split('\\')[3] || '';
              return text;
            },
          },
          formItem: {},
        },
      ];
      newColumns = newColumns.concat(temp);
    } else {
      if (item.name !== deleteColumns) {
        newColumns.push(item);
      }
    }
  });
  return newColumns;
}
/* 间隔一段时间执行某一方法
 * @param {*} flag 保存时间的flag
 * @param {*} callback 回调
 * @param {*} time 间隔时间，默认5000毫秒
 */
export function doWithThrottle(flag, callback, time = 5000) {
  //提交间隔设为5秒，防止弹出多个提示框
  if (flag + time < new Date().getTime()) {
    callback && callback();
    return new Date().getTime();
  } else {
    return flag;
  }
}

//替换Url参数中不合法的字符,可能不完整
export function filterIllegalCharacters(str) {
  str = str.replace(/\%/g, '%25');
  str = str.replace(/\#/g, '%23');
  str = str.replace(/\&/g, '%26');
  str = str.replace(/\ /g, '%20');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/\=/g, '%3D');
  return str;
}

export const isEnglish = getLocale() === 'en-US';

export const isIE11 = !!window.ActiveXObject || 'ActiveXObject' in window ? true : false;

// 计算缩放
export function calcZoom(divWidth, divHeight, imgWidth, imgHeight) {
  if (divHeight > imgHeight && divWidth < imgWidth) {
    return divWidth / imgWidth;
  }
  if (divHeight < imgHeight && divWidth > imgWidth) {
    return divHeight / imgHeight;
  }
  let zoomX = divWidth / imgWidth;
  let zoomY = divHeight / imgHeight;
  return zoomX < zoomY ? zoomX : zoomY;
}
//生成GUID
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
export function isIE() {
  var userAgent = navigator.userAgent;

  var isIE = userAgent.indexOf('NET') !== -1 && userAgent.indexOf('rv') !== -1;
  //todo 后面可以加上浏览器等级或者其他信息
  return isIE;
}

/**
 * 判断字符串是否是空字符串或者是全空格
 * @param {*} str
 */
export function isNull(str) {
  if (str === '') {
    return true;
  }
  var regu = '^[ ]+$';
  var re = new RegExp(regu);
  return re.test(str);
}

// 时间戳转化
export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
  // let Y = date.getFullYear() + '-';
  // let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  // let D = date.getDate() + ' ';
  // let h = date.getHours() + ':';
  // let m = date.getMinutes() + ':';
  // let s = date.getSeconds();
  // // 返回
  // return Y + M + D + h + m + s;
}
