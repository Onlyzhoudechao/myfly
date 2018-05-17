var $;
var bbsUrl="http://127.0.0.1:8080/oneManageM/";
layui.use(['layer','laytpl', 'form', 'element'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
	,layer=layui.layer;
	var localSession=layui.sessionData('user');
		$.ajax({
			type:"POST",
			url:bbsUrl+"type/listType.action",
			dataType:"json",  
			contentType:"application/json;charset=utf-8",
			success:function(data){
				if(data){
					for(var i = 0; i<data.length; i++){
						$("#layui_myul li").eq(1).append(" <li><a href='javascript:void(0);' onclick='getpost("+data[i].typeId+")'>"+data[i].typeName+"</a></li>");
					}
					if(localSession.userName!=null){
						var ul=$("#layui_myul");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html'>我发表的贴</a></li>");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html#collection'>我收藏的贴</a></li>");
					}
				}
				selectPostTop();
			}
		})
 })
//根据帖子的类型，查找出对应的帖子
function getpost(typeId){
	$.ajax({
				method : "get",
				url:bbsUrl+"type/listType.action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	alert("ok");
			    }
			});
}

function selectPostTop(){
	$.ajax({
			method : "get",
			url:bbsUrl+"post/selectPostTop.action",
			dataType:"json",  
			contentType:"application/json;charset=utf-8",
			success:function(data){
				var ul=document.getElementById("postTop");
				for(var i=0;data.length>i;i++){
					var postId=data[i].postId;
			    	var url='/fly/html/jie/detail.html?postId='+postId;
					var li = document.createElement("li");
					$(li).append("<a href='user/home.html' class='fly-avatar'><img src='https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg' alt='贤心'></a>");
					$(li).append("<h2><a class='layui-badge'>"+data[i].postTypename+"</a><a href="+url+">"+data[i].postTopic+"</a></h2>");
					var parentdiv=$('<div></div>');
					parentdiv.addClass('fly-list-info');
					parentdiv.append("<a href='user/home.html' link><cite>"+data[i].postUsername+"</cite></a><span>"+dateFormat(data[i].postCreatetime)+"</span>");
					parentdiv.append(" <span class='fly-list-nums'>  <i class='iconfont icon-pinglun1' title='回答'></i>"+data[i].postAnswernum+"</span>");
					$(li).append(parentdiv);
					if(data[i].postIsbest==1){
						$(li).append("<div class='fly-list-badge'><span class='layui-badge layui-bg-red'>精帖</span></div>");
					}
					ul.appendChild(li);
				}
				selectPostLimit();
			}
		})
}
function selectPostLimit(){
	$.ajax({
			method : "get",
			url:bbsUrl+"post/selectPostLimit.action",
			dataType:"json",  
			contentType:"application/json;charset=utf-8",
			success:function(data){
				var ul=document.getElementById("postLimit");
				for(var i=0;data.length>i;i++){
					var postId=data[i].postId;
			    	var url='/fly/html/jie/detail.html?postId='+postId;
					var li = document.createElement("li");
					$(li).append("<a href='user/home.html' class='fly-avatar'><img src='https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg' alt='贤心'></a>");
					$(li).append("<h2><a class='layui-badge'>"+data[i].postTypename+"</a><a href="+url+">"+data[i].postTopic+"</a></h2>");
					var parentdiv=$('<div></div>');
					parentdiv.addClass('fly-list-info');
					parentdiv.append("<a href='user/home.html' link><cite>"+data[i].postUsername+"</cite></a><span>"+dateFormat(data[i].postCreatetime)+"</span>");
					parentdiv.append(" <span class='fly-list-nums'>  <i class='iconfont icon-pinglun1' title='回答'></i>"+data[i].postAnswernum+"</span>");
					$(li).append(parentdiv);
					if(data[i].postIsbest==1){
						$(li).append("<div class='fly-list-badge'><span class='layui-badge layui-bg-red'>精帖</span></div>");
					}
					ul.appendChild(li);
				}
			}
		})
}
