layui.use(['layer','laytpl', 'form', 'element','laypage'],function(){
	$=layui.jquery
	,laytpl = layui.laytpl
 	,form = layui.form
  	,element = layui.element
  	,laypage = layui.laypage
	,layer=layui.layer;
		$("#header").load("/fly/html/common/header.html");
		$("#hiddenUserId").append("<input type='hidden' name='postUserid' value='"+$.cookie('userId')+"'>");
		var postId=GetRequest();
		if(postId){
			$("#editOrNew").html("编辑帖子");
			$("#hiddenUserId").append("<input type='hidden' name='postId' value='"+postId[1]+"'>");
			$("#hiddenUserId").append("<input type='hidden' name='_method' value='PUT'>");
			
			$.ajax({
				method : "get",
				url:layui.data('url').bbsUrl+"post/getPostById/"+postId[1]+".action",
				dataType:"json",  
				async: false,
				contentType:"application/json;charset=utf-8",
				headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
				success:function(data){
					$("#selectTypeName").append("<option selected value='"+data.postTypeid+"'>"+data.postTypename+"</option> ");
					$("#L_title").val(data.postTopic);
					$("#L_content").val(data.postContent);
					form.render('select');
				}
			});
		}else{
			$("#editOrNew").html("发表帖子");
			$.ajax({
				type : "post",
				url:layui.data('url').bbsUrl+"type/selectAllForMap.action",
				dataType:"json",  
				async: false,
				contentType:"application/json;charset=utf-8",
				success:function(data){
					$("#selectTypeName").append("<option></option>");
					for(var i=0;i<data.length;i++){
						$("#selectTypeName").append("<option value='"+data[i].typeId+"'>"+data[i].typeName+"</option> ");
					}
					form.render('select');
				}
			});
		}
		 
		
		//发布帖子
		form.on('submit(addOrPutPost)', function(data){
			if(postId){
				$.ajax({
		            url: layui.data('url').bbsUrl+"/post/putPost.action",
		            type:'post',
		            data: data.field,
		            headers: {
	             				 'X-Token':$.cookie('X-Token')
	          				},
		            success: function (data) {
		            	if(data.status==1){
		            		top.layer.msg('修改成功', {icon: 1});
		            		setTimeout("window.location.href='/fly/html/index.html'",1000);
		            	}else{
		            		top.layer.msg('修改失败', {icon: 5});
		            	}
		            }
	        	});
			}else{
				$.ajax({
					type : 'post',
					url:layui.data('url').bbsUrl+"post/addPost.action",
					dataType:"json",  
					data: data.field,
					success:function(data){
						if(data.status==1){
							top.layer.msg('发布成功', {icon: 1});
							setTimeout("window.location.href='/fly/html/index.html'",1000);
						}else{
							top.layer.msg('发布失败', {icon: 5});
						}
					}
				});
			}
			return false;
		})
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