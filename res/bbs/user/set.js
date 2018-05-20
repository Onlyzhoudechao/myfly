
layui.use(['layer','form'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 		 $("#header").load("/fly/html/common/header.html");
 		 
 		 $.ajax({
			method : "get",
			url:layui.data('url').bbsUrl+"buser/getBuserById/"+$.cookie('userId')+".action",
			dataType:"json",  
			async: false,
			headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
			contentType:"application/json;charset=utf-8",
			success:function(data){
				$("#userId").val(data.userId);
				$("#userId2").val(data.userId);  //设置第二个表单的隐藏域
				$("#L_email").val(data.userEmail);
				$("#L_username").val(data.userName);
				if(data.userSex){
					if(data.userSex=="0"){
						$("input[name='userSex']").get(0).checked=true; 
					}else{
						$("input[name='userSex']").get(1).checked=true; 
					}
				}
				$("#L_city").val(data.userAddress);
				$("#L_sign").val(data.userDescription);
				
			}
		});
		//提交修改
		form.on('submit(editBuser)', function(data){
	        $.ajax({
	            url: layui.data('url').bbsUrl+"/buser/putBuser.action",
	            type: 'post',
	            data: data.field,
	            headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
	            success: function (data) {
	            	if(data.status==1){
	            		top.layer.msg('修改成功', {icon: 1});
	            		
	            	}else{
	            		top.layer.msg('修改失败', {icon: 5});
	            	}
	            }
	        });
	        setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
				window.location.reload();//页面刷新
			},1000);
	        return false;
		});
		
		form.on('submit(editPass)', function(data){
	        //登陆验证
	        $.ajax({
	            url: layui.data('url').bbsUrl+"/buser/putBuser.action",
	            type: 'post',
	            data: data.field,
	            headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
	            success: function (data) {
	            	if(data.status==1){
	            		top.layer.msg(data.msg, {icon: 1});
	            		$.cookie('userId','', { expires: -1,path:'/'});
						$.cookie('userName','', { expires: -1,path:'/'});
	            		setTimeout("location.href ='login.html'",1000);
	            	}else{
	            		top.layer.msg(data.msg, {icon: 5});
	            		$("#L_nowpass").val('');
						$("#L_pass").val('');
						$("#L_repass").val('');
	            	}
	            }
	        });
	        return false;
		});
		
		//判断密码是否一致
		$("#L_repass").blur(function(){
			var password=$("#L_pass").val();
			var oldpass=$("#L_nowpass").val();
			var repass=$(this).val()
			if(password!=repass){
				layer.msg("2次输入的密码不一致，请重新输入" ,{icon: 2});
				$("#L_pass").val('');
				$("#L_repass").val('');
			}
			if(password==oldpass){
				layer.msg("新密码不能和老密码一样，请重新输入" ,{icon: 2});
				$("#L_nowpass").val('');
				$("#L_pass").val('');
				$("#L_repass").val('');
			}
			
		})
	
})
