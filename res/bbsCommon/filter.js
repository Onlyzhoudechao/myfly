layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
	,layer=layui.layer;
	//监听综合，未结，已结和精华的点击事件
		$("#filter1 a").on('click',function(){
			if($("#filter1 a").hasClass("layui-this")){
				$("#filter1 a").removeClass("layui-this");
			}
			$(this).addClass("layui-this");
			var value=$(this).attr("value");
			if(layui.cache.page && layui.cache.page == 'jie'){
				var typeid;
				if($("#layui_myul li").hasClass("layui-this")){
					//保持类型为点击状态
					typeid=$("#layui_myul li .layui-this")[0].firstChild.attributes.value['value'];
				}
					selectPostByPage(1,limits,value,typeid);
					//点击选择filter以后的渲染
					 pageRender();
			}else{
				//window.location.href="/fly/html/jie/index.html";
			}
			
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

