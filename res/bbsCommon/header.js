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
	
	$.ajax({
			type:"POST",
			url:layui.data('url').bbsUrl+"board/selectAllBoard.action",
			dataType:"json",  
			contentType:"application/json;charset=utf-8",
			success:function(data){
				if(data){
					for(var i = 0; i<data.length; i++){
						$("#layui-board").append("<li class='layui-nav-item'><a href='javascript:void(0);' value='"+data[i].board_id+"'>"+data[i].board_name+"</a></li>");
					}
				}
			}
		});
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
	            		setTimeout("location.href ='/fly/html/user/login.html'",1000);
	            	}else{
	            		top.layer.msg('退出失败', {icon: 5});
	            	}
	            }
	        });
	});
 })

