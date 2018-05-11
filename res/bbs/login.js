layui.use(['layer','form'],function(){
	 var bbsUrl="http://127.0.0.1:8080/oneManageM/";
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 	form.on('submit(login)', function(data){
 		var action = $(data.form).attr('action');
		var url=bbsUrl+action;
		$.ajax({
		 		type:'post',
		        dataType:'json',
		        data: JSON.stringify(data.field),
		        url: url,
		        xhrFields: {withCredentials: true},
		        contentType:"application/json;charset=utf-8",
		        success: function(res){
		          if(res.status === 0) {
		          	var userName=res.userName;
		          	//登录成功以后，把用户名和id传到layui的localSession组件中
		          	layui.sessionData('user', {
  		 					 key: 'userName'
 		 					,value:res.userName
					});
					layui.sessionData('user', {
  		 					 key: 'userId'
 		 					,value:res.userId
					});
		            top.layer.msg(res.msg, {icon: 1});
		            //登录后跳转到主目录
		            tohome();
		          } else {
		            layer.msg(res.msg || res.code, {shift: 6});
		            setTimeout("location.href ='login.html'",2000);
		          }
		        }, error: function(e){
		          layer.msg('请求异常，请重试', {shift: 6});
		        }
		 	});
 		return false;
	})
 	
	$("#header").load("/fly/html/common/header.html");
})
 	function tohome(){
 		//setTimeout("window.location.href='home.html?value='+userId",2000);
 		setTimeout("window.location.href='home.html'",1000);
 	}
 	

	 