/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */
((doc: any, win: any) => {
    let docEl: any = doc.documentElement;
    let isIOS: any = navigator.userAgent.match(/iphone|ipod|ipad/gi);
    let dpr:any = isIOS? Math.min(win.devicePixelRatio, 3) : 1;
        dpr = window.top === window.self? dpr : 1; //被iframe引用时，禁止缩放
        dpr = 1; // 首页引用IFRAME，强制为1
    let scale: number = 1 / dpr
    let resizeEvt: string = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = win.devicePixelRatio;
    if(navigator.userAgent.match(/iphone/gi) && screen.width == 375 && win.devicePixelRatio == 2){
        docEl.classList.add('iphone6')
    }
    if(navigator.userAgent.match(/iphone/gi) && screen.width == 414 && win.devicePixelRatio == 3){
        docEl.classList.add('iphone6p')
    }
    let metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    let recalc = function () {
        let width = docEl.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);
