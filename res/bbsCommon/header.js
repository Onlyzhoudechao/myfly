layui.use(['layer', 'form', 'element'],function(){
	$=layui.jquery
 	,form = layui.form
  	,element = layui.element
	,layer=layui.layer;
	if($.cookie('userId') !=null && $.cookie('userName') !=null ){
	 	$("#userName").text($.cookie('userName'));
	 	document.getElementById("nologin").style.display="none";
	 	document.getElementById("logined").style.display="block";
	 	/*var li = document.createElement("li");
	 	$(li).append("<a class='fly-nav-avatar' href='javascript:void(0);'><cite class='layui-hide-xs'>"+$.cookie('userName')+"</cite><img src='/fly/res/images/top.jpg'></a>");
	 	var childdl=$("<dl class='layui-nav-child'></dl>");
	 	childdl.append("<dd><a href='/fly/html/user/set.html'><i class='layui-icon'>&#xe620;</i>基本设置</a></dd>");
	 	childdl.append("<dd><a href='/fly/html/user/message.html'><i class='iconfont icon-tongzhi' style='top: 4px;'></i>我的消息</a></dd>");
	 	childdl.append("<dd><a href='/fly/html/user/home.html'><i class='layui-icon' style='margin-left: 2px; font-size: 22px;'>&#xe68e;</i>我的主页</a></dd>");
	 	childdl.append("<hr style='margin: 5px 0;'>");
	 	childdl.append("<dd><a href='javascript:void(0);' id='logout' style='text-align: center;'>退出</a></dd>");
	 	$(li).append(childdl);
	 	
	 	$("#logined").append(li);*/
	}
		/*$("#logined").append("<li class='layui-nav-item'><a class='iconfont icon-touxiang layui-hide-xs' href='../user/login.html'></a></li>");
		$("#logined").append("<li class='layui-nav-item'><a href='/fly/html/user/login.html'>登入</a></li>");
		$("#logined").append("<li class='layui-nav-item'><a href='/fly/html/user/reg.html'>注册</a></li>");*/
	
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

