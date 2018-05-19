layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
	,layer=layui.layer;
		$.ajax({
			type:"POST",
			url:layui.data('url').bbsUrl+"type/listType.action",
			dataType:"json",  
			async: false,
			contentType:"application/json;charset=utf-8",
			success:function(data){
				if(data){
					for(var i = 0; i<data.length; i++){
						$("#layui_myul li").eq(1).append(" <li ><a href='javascript:void(0);' value='"+data[i].typeId+"'>"+data[i].typeName+"</a></li>");
					}
					if($.cookie('userId') !=null && $.cookie('userName') !=null){
						var ul=$("#layui_myul");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html'>我发表的贴</a></li>");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='user/index.html#collection'>我收藏的贴</a></li>");
					}
				}
				if(layui.cache.page && layui.cache.page == 'jie'){
					selectPostByPage();
				}
				if(layui.cache.page && layui.cache.page == 'index'){
					selectPostTop();
				}
				
			}
		});
		
		$("#layui_myul a").on('click',function(){
			typeId=$(this).attr("value");
			selectPostByPage(1,limits,null,typeId);
			pageRender();
		});
		if(layui.cache.page && layui.cache.page == 'jie'){
			//初次加载的渲染
			pageRender();
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
		}
		
 })

