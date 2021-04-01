const loaderUtils = require('loader-utils');

const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
let mediaArr = [];
const newMediaArr = [];
const config = {
    unitType: 'vw',         // unitType 转成单位类型
    width: 750,             // width 设计尺寸
    precision: 6,           // precision 默认保留6位小数
    minExclude: 1,          // minExclude 小于1的不做转换
    translateMedia: false   // allTranslate (false => 转换所有, true => 只会转换 media下所有px)
}

const regExp = () => {
    return new RegExp(pxRegExp.source, 'g');
}

const getValue = val => {
    val = parseFloat(val.toFixed(config.precision));
    return val === 0 ? val : val + config.unitType;
}

const getMedia = (source) => {
    mediaArr = source.replace(/[\r\n\t]+/g, '').match(/(@media.*?\}.*?\})/g);
    return (mediaArr || []).length;
};

const calcUnit = (source, width) => {
    return source.replace(regExp(), ($0, $1) => {
        return $1 > config.minExclude ? getValue($1 / width) : $0;
    });
};

const handleMediaUnit = (source) => {
    let result = source.replace(/[\r\n\t]+/g, '');
    mediaArr.forEach(item => {
        const itemReg = item.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        const replaceStr = item.replace(new RegExp(/\b(\d+(\.\d+)?)px\b;/.source, 'g'), ($0, $1) => $1 / config.width + config.unitType);
        result = result.replace(new RegExp(itemReg, 'g'), replaceStr);
    })
    return result;
}

const vw = (source) => {
    const len = getMedia(source);
    if(len > 0 && config.translateMedia) {
        return handleMediaUnit(source);
    }else {
        return calcUnit(source, config.width);
    }
}

const rem = (source) => {
    const len = getMedia(source);
    if(len > 0 && config.translateMedia) {
        return handleMediaUnit(source);
    }else {
        return calcUnit(source, 100);
    }
}

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    Object.assign(config, options || {});
    let newSource;
    switch(config.unitType) {
        case 'rem':
            newSource = rem(source);
            break;
        case 'vw':
        default:
            newSource = vw(source);
            break;

    }
    return newSource
}
