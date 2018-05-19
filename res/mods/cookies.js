// 入口文件
layui.define(['jquery', 'jquery_cookie'], function (exports) {
    var $ = layui.jquery;  
    // 可能需要导入多个扩展插件
    $ = layui.jquery_cookie($);

    // 作为入口无需注册模块,所以直接null
    exports('cookies', null);
});