layui.use(['layer','form'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 			 
 		 $("#header").load("/fly/html/common/header.html");
  		//异步访问后台用户名是否重复
		$("#L_username").blur(function(){
			    //必须取值，不然传不到值
			    var userName = $(this).val(); 
			    //用ajax去数据库匹配，
			    $.ajax({
			        url:layui.data('url').bbsUrl+"register/getBuserAndEmail.action",       //要处理的页面
			        data:JSON.stringify({userName:userName}),              //要传过去的数据
			        type:"POST",               //提交方式
			        dataType:"json",  
			        contentType:"application/json;charset=utf-8",
			        success:function(data){          //回调函数，data为形参，是从login-cl.php页面返回的值
			            if(data.status==0)           //trim()去空格，因为会返回全部内容，包括空格回车等，所以
			            {
			              layer.msg(data.msg ,{icon: 2});
            			  $("#L_username").val('');
			            }
			        }
  		  	}); 
        })
		//异步访问后台邮箱是否重复
		$("#L_email").blur(function(){
			    //必须取值，不然传不到值
			    var userEmail = $(this).val(); 
			    //用ajax去数据库匹配，
			    $.ajax({
			        url:layui.data('url').bbsUrl+"register/getBuserAndEmail.action",       //要处理的页面
			        data:JSON.stringify({userEmail:userEmail}),              //要传过去的数据
			        type:"POST",               //提交方式
			        dataType:"json",  
			        contentType:"application/json;charset=utf-8",
			        success:function(data){          //回调函数，data为形参，是从login-cl.php页面返回的值
			            if(data.status==0)           //trim()去空格，因为会返回全部内容，包括空格回车等，所以
			            {
			              layer.msg(data.msg ,{icon: 2});
            			  $("#L_email").val('');
			            }
			        }
  		  	}); 
        })
		//判断密码是否一致
		$("#L_repass").blur(function(){
			var password=$("#L_pass").val();
			var repass=$(this).val()
			if(password!=repass){
				layer.msg("2次输入的密码不一致，请重新输入" ,{icon: 2});
				$("#L_pass").val('');
				$("#L_repass").val('')
			}
		})
		
		//点击注册触发事件
		 form.on('submit(register)', function(data){
		 	//获取表单中的action
		 	var action = $(data.form).attr('action');
		 	//拼装后台访问路径
		 	var url=layui.data('url').bbsUrl+action;
		 	$.ajax({
		 		type:'post',
		        dataType:'json',
		        data: JSON.stringify(data.field),
		        url: url,
		        contentType:"application/json;charset=utf-8",
		        success: function(res){
		          if(res.status === 0) {
		            top.layer.msg(res.msg, {icon: 1});
		            setTimeout("location.href ='login.html'",2000);
		          } else {
		            layer.msg(res.msg || res.code, {shift: 6});
		            setTimeout("location.href ='reg.html'",2000);
		          }
		        }, error: function(e){
		          layer.msg('请求异常，请重试', {shift: 6});
		        }
		 	});
		 	return false;
		 })
		
		
		
		
})