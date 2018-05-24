var $;
var limits=3; //分页数量
var total;
var typeId;
layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
	,layer=layui.layer;
		$("#header").load("/fly/html/common/header.html");
		$("#typeName").load("/fly/html/common/column.html");
		$("#zonghe").load("/fly/html/common/filter.html");
 })
	
		//分页获取帖子
		function selectPostByPage(curr,limit,str,typeId){
			//第一次访问的时候查询的页数
			if(!limit){
				limit=limits;
			}
			var data={limit:limit,curr:curr};
			if(typeId){
				data={limit:limit,curr:curr,postTypeid:typeId};
				if(str){
					if(str==1){
						data={limit:limit,curr:curr,postTypeid:typeId};
					}else if(str==2){
						data={limit:limit,curr:curr,"postIsend":"0",postTypeid:typeId};
					}else if(str==3){
						data={limit:limit,curr:curr,"postIsend":"1",postTypeid:typeId};
					}else{
						data={limit:limit,curr:curr,"postIsbest":"1",postTypeid:typeId};
					}
				}
			}else{
				if(str){
					if(str==1){
						data={limit:limit,curr:curr};
					}else if(str==2){
						data={limit:limit,curr:curr,"postIsend":"0"};
					}else if(str==3){
						data={limit:limit,curr:curr,"postIsend":"1"};
					}else{
						data={limit:limit,curr:curr,"postIsbest":"1"};
					}
				}
			}
			$.ajax({
					type:'post',
					url:layui.data('url').bbsUrl+"post/selectPostByPage.action",
					dataType:'json',  
					async: false,
					data:data,
					//contentType:'application/json;charset=UTF-8',
				   //	contentType:"application/x-www-form-urlencoded",
					success:function(res){
						total=res.count;
						var ul=document.getElementById("postLimit");
						//点击下一页的时候，把上一页的东西清除掉
						$(ul).find("li").remove();
						for(var i=0;res.data.length>i;i++){
							var postId=res.data[i].postId;
					    	var url='/fly/html/jie/detail.html?postId='+postId;
					    	var answeNum;
							if(res.data[i].postAnswernum){
								answeNum=res.data[i].postAnswernum
							}else{
								answeNum=0;
							}
							var li = document.createElement("li");
							$(li).append("<a href='user/home.html' class='fly-avatar'><img src='/fly/res/images/top.jpg'></a>");
							$(li).append("<h2><a class='layui-badge'>"+res.data[i].postTypename+"</a><a href="+url+">"+res.data[i].postTopic+"</a></h2>");
							var parentdiv=$('<div></div>');
							parentdiv.addClass('fly-list-info');
							parentdiv.append("<a href='user/home.html' link><cite>"+res.data[i].postUsername+"</cite></a><span>"+dateFormat(res.data[i].postCreatetime)+"</span>");
							parentdiv.append(" <span class='fly-list-nums'>  <i class='iconfont icon-pinglun1' title='回答'></i>"+answeNum+"</span>");
							$(li).append(parentdiv);
							if(res.data[i].postIsbest==1){
								$(li).append("<div class='fly-list-badge'><span class='layui-badge layui-bg-red'>精帖</span></div>");
							}
							ul.appendChild(li);
						}
						
					}
				})
		}
