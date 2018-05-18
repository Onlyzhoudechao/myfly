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
			}
		})
 })

