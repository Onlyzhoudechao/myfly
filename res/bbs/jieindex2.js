var bbsUrl="http://127.0.0.1:8080/oneManageM/";
var $;
var limits=2; //分页数量
var total;
var typeId;
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
			async: false,
			contentType:"application/json;charset=utf-8",
			success:function(data){
				if(data){
					for(var i = 0; i<data.length; i++){
						$("#layui_myul li").eq(1).append(" <li ><a href='javascript:void(0);' value='"+data[i].typeId+"'>"+data[i].typeName+"</a></li>");
					}
					if(localSession.userName!=null){
						var ul=$("#layui_myul");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html'>我发表的贴</a></li>");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html#collection'>我收藏的贴</a></li>");
					}
				}
				selectPostByPage();
			}
		});
		
		$("#typeName").load("/fly/html/common/column.html");
		
		$("#layui_myul a").on('click',function(){
			typeId=$(this).attr("value");
			selectPostByPage(1,limits,null,typeId);
			pageRender();
			/*if($("#layui_myul li").hasClass("layui-this")){
				debugger;
				$("#layui_myul li").removeClass("layui-this");
			}
			var index=$(this).index();
			$("#layui_myul li").eq(index).addClass("layui-this");*/
		});
		
		  //监听综合，未结，已结和精华的点击事件
		$("#filter1 a").on('click',function(){
			if($("#filter1 a").hasClass("layui-this")){
				$("#filter1 a").removeClass("layui-this");
			}
			$(this).addClass("layui-this");
			var value=$(this).attr("value");
			selectPostByPage(1,limits,value);
			//点击选择filter以后的渲染
			 pageRender();
		});
		
		function pageRender(){
			  laypage.render({
			    elem: 'page'
			    ,count: total //数据总数
			    ,limit:limits
			    ,jump: function(obj,first){
			    	if(!first){
			    		selectPostByPage(obj.curr,obj.limit);
		    		}
			    }
			  });
		}
		
	
		//初次加载的渲染
		pageRender();
		
 })

	
		//分页获取帖子
		function selectPostByPage(curr,limit,str,typeId){
			//第一次访问的时候查询的页数
			if(!limit){
				limit=limits;
			}
			var data={limit:limit,curr:curr};
			if(typeId){
				data={limit:limit,curr:curr,typeId:typeId};
				if(str){
					if(str==1){
						data={limit:limit,curr:curr,typeId:typeId};
					}else if(str==2){
						data={limit:limit,curr:curr,"postIsend":"0",typeId:typeId};
					}else if(str==3){
						data={limit:limit,curr:curr,"postIsend":"1",typeId:typeId};
					}else{
						data={limit:limit,curr:curr,"postIsbest":"1",typeId:typeId};
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
			$.ajax({
					type:'post',
					url:bbsUrl+"post/selectPostByPage.action",
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
							var li = document.createElement("li");
							$(li).append("<a href='user/home.html' class='fly-avatar'><img src='/fly/res/images/top.jpg'></a>");
							$(li).append("<h2><a class='layui-badge'>"+res.data[i].postTypename+"</a><a href="+url+">"+res.data[i].postTopic+"</a></h2>");
							var parentdiv=$('<div></div>');
							parentdiv.addClass('fly-list-info');
							parentdiv.append("<a href='user/home.html' link><cite>"+res.data[i].postUsername+"</cite></a><span>"+dateFormat(res.data[i].postCreatetime)+"</span>");
							parentdiv.append(" <span class='fly-list-nums'>  <i class='iconfont icon-pinglun1' title='回答'></i>"+res.data[i].postAnswernum+"</span>");
							$(li).append(parentdiv);
							if(res.data[i].postIsbest==1){
								$(li).append("<div class='fly-list-badge'><span class='layui-badge layui-bg-red'>精帖</span></div>");
							}
							ul.appendChild(li);
						}
						
					}
				})
		}

//根据帖子的类型，查找出对应的帖子
/*function getpost(typeId){
	if($("#layui_myul li a").hasClass("layui-this")){
		$("#layui_myul li a").removeClass("layui-this");
	}
	$(this).addClass("layui-this");
	onclick='getpost("+data[i].typeId+")'
	$.ajax({
				method : "get",
				url:bbsUrl+"type/listType.action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    }
			});
}*/

