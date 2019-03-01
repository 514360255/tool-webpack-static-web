/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */
import '../css/index.scss';

// π„∏Ê√ΩΩÈ
let mediaLeftContent: any = $('.media-left-content');
let mediaLeftTab: any = $('.media-left-tab');
let tabIndex: number = 0;
mediaLeftTab.on('mouseenter', '.media-left-tab-list', function() {
   let index: number = $(this).index();
    mediaLeftTab
        .find('.media-left-tab-list')
        .eq(index)
        .addClass('current')
        .siblings()
        .removeClass('current');
    mediaLeftTab
        .find('img')
        .eq(tabIndex)
        .attr('src', `static/images/media-img${tabIndex + 1}-link.png`);
    mediaLeftTab
        .find('img')
        .eq(index)
        .attr('src', `static/images/media-img${index + 1}-hover.png`);
    tabIndex = index;
    mediaLeftContent
        .find('.media-left-list')
        .eq(index)
        .removeClass('hide')
        .siblings()
        .addClass('hide');
});
