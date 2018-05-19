layui.use(['layer','form'],function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 		form.on('submit(login)', function(data){
	 		var action = $(data.form).attr('action');
			var url=layui.data('url').bbsUrl+action;
			$.ajax({
			 		type:'post',
			        dataType:'json',
			        data: JSON.stringify(data.field),
			        url: url,
			        xhrFields: {withCredentials: true},
			        contentType:"application/json;charset=utf-8",
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
 		setTimeout("window.location.href='home.html'",1000);
 	}
 	
 	

	 