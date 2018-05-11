layui.use(['layer'],function(){
	var $=layui.jquery
	,layer=layui.layer;
	var bbsUrl="http://127.0.0.1:8080/oneManageM/";
	/*$(function(){
			$.ajax({
				type:"POST",
				url:bbsUrl+"type/listType.action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	if(data){
						for(var i = 0; i<data.length; i++){
							var name = data[i];
							$("#layui_myul li").eq(1).append(" <li><a href='jie/index.html?typeId='"+data[i].typeId+">"+name.typeName+"</a></li>");
						}
					}
			    }
			});
		})*/
})
