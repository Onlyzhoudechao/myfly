layui.use(['layer','form'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 		 
 		 form.on('submit(getPassword)', function(data){
			$.ajax({
			 		type:'post',
			        data: data.field,
			        url: "http://127.0.0.1:8080/oneManageM/tokens/getPassword.action",
			        dataType:"json", 
			        success: function(res){
				          if(res.status === 0) {
				            top.layer.msg(res.passWord, {icon: 1});
				            setTimeout("location.href ='login.html'",2000);
				          } else {
				            layer.msg(res.msg || res.code, {shift: 6});
				            $("#L_email").val('');
				            $("#L_username").val('');
				            $("#L_question").val('');
				            $("#L_answer").val('');
				          }
			 		}
			    });
	 		return false;
		})
 		 
 		$("#header").load("/fly/html/common/header.html");
})
