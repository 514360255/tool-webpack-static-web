/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */
require('../css/base.scss');
// import {checkEquipment} from "./common/utils";

// 载入 jquery 库
const _$ = require("expose-loader?$!jquery");
window['$'] = _$;
window['jQuery'] = _$;
require('./common/fipster');

/**
 * 检测是否是手机端
 * 如果是手机端就加载flexible js
 */
// if(checkEquipment() === 'mobile') {
// }
require('./common/flexible.ts');

/**
 * 菜单
 * @type {JQuery<HTMLElement>}
 */
let headerMenu: any = $('.head-menu-img');
let menu: any = $('.menu');
let body: any = $('body');
headerMenu.on('click', 'img', function() {
    if(menu.hasClass('hide')) {
        menu.removeClass('hide');
        body.css({overflow: 'hidden'});
    }else {
        menu.addClass('hide');
        body.css({overflow: ''});
    }
});

body.on('click', function(element: any) {
    if(!/head-img-btn/.test(element.target.className)) {
        menu.addClass('hide');
        body.css({overflow: ''});
    }
});

