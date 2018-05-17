var $;
var bbsUrl="http://127.0.0.1:8080/oneManageM/";
layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
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
						$("#layui_myul li").eq(1).append(" <li ><a href='javascript:void(0);' onclick='getpost("+data[i].typeId+")'>"+data[i].typeName+"</a></li>");
					}
					if(localSession.userName!=null){
						var ul=$("#layui_myul");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html'>我发表的贴</a></li>");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html#collection'>我收藏的贴</a></li>");
					}
				}
				selectPostLimit();
			}
		});
	//监听综合，未结，已结和精华的点击事件
	$("#filter1 a").on('click',function(){
		if($("#filter1 a").hasClass("layui-this")){
			$("#filter1 a").removeClass("layui-this");
		}
		$(this).addClass("layui-this");
	});
	
 })
//根据帖子的类型，查找出对应的帖子
function getpost(typeId){
	alert("666");
	if($("#layui_myul li a").hasClass("layui-this")){
		$("#layui_myul li a").removeClass("layui-this");
	}
	$(this).addClass("layui-this");
	/*$.ajax({
				method : "get",
				url:bbsUrl+"type/listType.action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    }
			});*/
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
					$(li).append("<a href='user/home.html' class='fly-avatar'><img src='/fly/res/images/top.jpg'></a>");
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
