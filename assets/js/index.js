$(function() {
    getUserInfo()


    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清除本地存储的token
            localStorage.removeItem('token')
                //重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })


})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        //无论成功还是失败，都会调用complete函数
        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //             //强制跳转到登录界面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户头像
    if (user.user_pic != null) {
        //渲染图片头像 
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}