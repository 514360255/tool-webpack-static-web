/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */

/**
 * 检测设备是手机还是电脑
 */
export const checkEquipment = () => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return 'mobile';
    }
    else {
        return 'pc';
    }
}
