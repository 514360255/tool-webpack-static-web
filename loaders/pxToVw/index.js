const loaderUtils = require('loader-utils');

const pxRegExp = /\b(\d+(\.\d+)?)px\b;/;
const nRegExp = /[\r\n\t]+/g;
let mediaArr = [];
const config = {
    unitType: 'vw',         // unitType 转成单位类型
    width: 750,             // width 设计尺寸
    precision: 6,           // precision 默认保留6位小数
    minExclude: 1,          // minExclude 小于1的不做转换
    translateMedia: false   // allTranslate (false => 转换所有, true => 只会转换 media下所有px)
}

const regExp = (exp = pxRegExp.source) => {
    return new RegExp(exp, 'g');
}

const getValue = val => {
    val = parseFloat(val.toFixed(config.precision));
    return (val === 0 ? val : val + config.unitType) + ';';
}

const getMedia = (source) => {
    mediaArr = source.replace(nRegExp, '').match(/(@media.*?\}.*?\})/g);
    return (mediaArr || []).length;
};

const calcValue = ($0, $1) => {
    return $1 > config.minExclude ? /px;$/.test($0) ? getValue($1 / config.width * (config.unitType === 'vw' ? 100 : 1)) : $0 : $0;
}

const calcUnit = (source) => {
    return source.replace(regExp(), ($0, $1) => calcValue($0, $1));
};

const handleMediaUnit = (source) => {
    let result = source.replace(/[\r\n\t]+/g, '');
    mediaArr.forEach(item => {
        const itemReg = item.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        const replaceStr = item.replace(new RegExp(pxRegExp.source, 'g'), ($0, $1) => calcValue($0, $1));
        result = result.replace(new RegExp(itemReg, 'g'), replaceStr);
    })
    return result;
}

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    Object.assign(config, options || {});

    const len = getMedia(source);
    if(config.translateMedia) return len > 0 && handleMediaUnit(source);
    return calcUnit(source);
}
