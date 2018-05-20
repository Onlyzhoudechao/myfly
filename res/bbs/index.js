var $;
layui.use(['layer','laytpl', 'form', 'element'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
	,layer=layui.layer;
	$("#header").load("/fly/html/common/header.html");
	$("#typeName").load("/fly/html/common/column.html");
	$("#zonghe").load("/fly/html/common/filter.html");
	
	layui.data('url', {
	  key: 'bbsUrl'
	  ,value: 'http://127.0.0.1:8080/oneManageM/'
	});
 })

//查询出顶置的4条帖子
function selectPostTop(){
	$.ajax({
			method : "get",
			url:layui.data('url').bbsUrl+"post/selectPostTop.action",
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
//查询出首页的前20条帖子
function selectPostLimit(){
	$.ajax({
			method : "get",
			url:layui.data('url').bbsUrl+"post/selectPostLimit.action",
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
