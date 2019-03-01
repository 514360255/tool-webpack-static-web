/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/3/1
 */
import '../css/index.scss';

$('img').each((key: number, item: any) => {
    console.log(key, $(item).attr('src'));
});
