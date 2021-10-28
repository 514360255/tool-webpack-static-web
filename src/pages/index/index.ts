/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */
import './index.scss';
const moment = require('moment');

$('img').each((key: number, item: any) => {
    console.log(key, $(item).attr('src'));
    console.log(true);
});
console.log(moment());
