

$(function () {
    var $loginBox=$('#loginBox');
    var $registerBox=$('#registerBox');
    var $successBox=$('#successBox');

    //切换到注册面板
    $loginBox.find('a.hLink').on('click',function () {
        $registerBox.show();
        $loginBox.hide();
    })

    //切换到登录面板
    $registerBox.find('a.hLink').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
    })

    //注册
    $registerBox.find('button').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val(),
            },
            dataType:'json',
            success:function (result) {
                $registerBox.find('.warning').html(result.message);
                if(!result.code){
                    //注册成功
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    },1000);
                }
            }
        })
    })
    $loginBox.find('button').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function (result) {
                $loginBox.find('.warning').html(result.message);
                if(!result.code){
                    //登录成功

                    // setTimeout(function () {
                    //     $loginBox.hide();
                    //     $successBox.show();
                    //
                    //     //显示登录用户的信息
                    //     $successBox.find('.username').html(result.userInfo.username);
                    //     $successBox.find('.info').html('你好，欢迎来到我的博客！');
                    // },1000);

                    window.location.reload();
                }
            }
        })
    })

    $('#logout').on('click',function () {
        $.ajax({
            url:'api/user/logout',
            success:function (result) {
                if(!result.code){
                    window.location.reload();
                }
            }
        });
    })
});
