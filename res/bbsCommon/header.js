layui.use(['layer', 'form', 'element'],function(){
	$=layui.jquery
 	,form = layui.form
  	,element = layui.element
	,layer=layui.layer;
	if($.cookie('userId') !=null && $.cookie('userName') !=null ){
	 	$("#userName").text($.cookie('userName'));
	 	document.getElementById("nologin").style.display="none";
	 	document.getElementById("logined").style.display="block";
	}
	
	$("#logout").on('click',function(){
		 $.ajax({
	            url: layui.data('url').bbsUrl+"/tokens/logout.action",
	            method: 'delete',
	            headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
	            success: function (data) {
	            	if(data.status==1){
						$.cookie('userId','', { expires: -1,path:'/'});
						$.cookie('userName','', { expires: -1,path:'/'});
	            		top.layer.msg(data.msg, {icon: 1});
	            		setTimeout("location.href ='login.html'",1000);
	            	}else{
	            		top.layer.msg('退出失败', {icon: 5});
	            	}
	            }
	        });
	});
 })

