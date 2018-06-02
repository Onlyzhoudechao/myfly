layui.use(['layer','form'],function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 		form.on('submit(login)', function(data){
			$.ajax({
			 		type:'post',
			       // data:{userName:data.field.userName,userPassword:data.field.userPassword},
			       // data: JSON.stringify(data.field),
			        data: data.field,
			        url: layui.data('url').bbsUrl+"/tokens/login.action",
			        xhrFields: {withCredentials: true},
			        crossDomain: true,
			        headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
			        success: function(res){
			          if(res.status === 0) {
			            top.layer.msg(res.msg, {icon: 1});
			            //登录后跳转到主目录
			            tohome();
			          } else {
			            layer.msg(res.msg || res.code, {shift: 6});
			            $("#L_pass").val('');
			            $("#L_username").val('');
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
 		setTimeout("window.location.href='/fly/html/user/home.html'",1000);
 	}
 	
 	

	 