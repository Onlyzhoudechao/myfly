layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
	,layer=layui.layer;
	$("#addPostnew").on('click',function(){
		if($.cookie('userId')){
			window.location.href='/fly/html/jie/add.html';
		}else{
			top.layer.msg('请先登录', {icon: 5});
		}
	})
	
	//获取首页传过来的类型ID
	var tyId=GetRequest();
		$.ajax({
			type:"POST",
			url:layui.data('url').bbsUrl+"type/listType.action",
			dataType:"json",  
			async: false,
			contentType:"application/json;charset=utf-8",
			success:function(data){
				if(data){
					for(var i = 0; i<data.length; i++){
						$("#layui_myul li").eq(1).append(" <li id=a_'"+data[i].typeId+"'><a href='javascript:void(0);' value='"+data[i].typeId+"'>"+data[i].typeName+"</a></li>");
					}
					if($.cookie('userId') !=null && $.cookie('userName') !=null){
						var ul=$("#layui_myul");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='/fly/html/user/index.html'>我发表的贴</a></li>");
						ul.append("<li class='layui-hide-xs layui-hide-sm layui-show-md-inline-block'><a href='/fly/html/user/index.html#collection'>我收藏的贴</a></li>");
					}
				}
				if(layui.cache.page && layui.cache.page == 'jie'){
					if(tyId){
						$("#a_"+tyId[0]).addClass("layui-this");
						selectPostByPage(1,null,null,tyId[0]);
					}else{
						selectPostByPage();
					}
					
					
				}
				if(layui.cache.page && layui.cache.page == 'index'){
					selectPostTop();
				}
				
			}
		});
		//点击类型时的触发事件
				$("#layui_myul li").on('click',function(){
					//切换点击类型时，综合这一栏去除选中
					$("#filter1 a").removeClass("layui-this");
					//切换点击类型时，默认选中综合
					$("#filter1 a").eq(0).addClass("layui-this");
					if($("#layui_myul li").hasClass("layui-this")){
						$("#layui_myul li").removeClass("layui-this");
					}
					$(this).addClass("layui-this");
					if(layui.cache.page && layui.cache.page == 'jie'){
						selectPostByPage(1,limits,null,$(this)[0].firstChild.attributes.value['value']);
						pageRender();
					}else{
						window.location.href="/fly/html/jie/index.html?"+$(this)[0].firstChild.attributes.value['value'];
					}
					return false;
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
//获取url后面带过来的参数
function GetRequest() {
	var strs;
   var url = location.search; //获取url中"?"符后的字串
   if (url.indexOf("?") != -1) {    //判断是否有参数
      var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
   }
   return strs;
}
