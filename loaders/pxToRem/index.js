const loaderUtils = require('loader-utils');
const config = {
    remPrecision: 6,        // remPrecision 默认保留6位小数
    remMinExclude: 1,       // remMinExclude 小于1的不做转换
    remAllTranslate: true   // remAllTranslate (true => 适用于移动端, false => 只会转换 media下所有px)
}
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;

const regExp = () => {
    return new RegExp(pxRegExp.source, 'g');
}

const getValue = val => {
    val = parseFloat(val.toFixed(config.remPrecision));
    return val === 0 ? val : val + 'rem';
}

module.exports = source => {
    if(!config.remAllTranslate) return source;
    const options = loaderUtils.getOptions(this);
    Object.assign(config, options || {});

    return source.replace(regExp(), ($0, $1) => {
        return $1 > config.remMinExclude ? getValue($1 / 100) : $0;
    });
}
