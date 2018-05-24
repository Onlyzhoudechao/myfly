layui.use(['layer','form','fly'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,fly=layui.fly
 			 ,form=layui.form;
			var postId=GetRequest();
			if($.cookie('userId')){
				$("#reply").append("<input type='hidden' name='replyUserid' value='"+$.cookie('userId')+"'>");
			}
			
			$("#reply").append("<input type='hidden' name='replyPostid' value='"+postId[1]+"'>");
			$("#L_content").val('');
			$.ajax({
				method : "get",
				url:layui.data('url').bbsUrl+"post/selectPostAndReply/"+postId[1]+".action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	$("#postTopic").text(data.postTopic);
			    	if(data.postTypename){
			    		$("#detail").append("<span class='layui-badge layui-bg-green fly-detail-column'>"+data.postTypename+"</span>");
			    	}
			    	if(data.postIsbest==1){
			    		$("#detail").append("<span class='layui-badge layui-bg-red'>精帖</span>");
			    	}
			    	if(data.postIsend==1){
			    		$("#detail").append("<span class='layui-badge' style='background-color: #5FB878;'>已结</span>");
			    	}else{
			    		$("#detail").append("<span class='layui-badge' style='background-color: #5FB878;'>未结</span>");
			    	}
			    	if(data.postAnswernum){
			    		$("#read").text(data.postAnswernum);
			    	}else{
			    		$("#read").text('0');
			    	}
			    	if(data.postReadnum){
			    		$("#look").text(data.postReadnum);
			    	}else{
			    		$("#look").text('0');
			    	}
			    	//登录的时候显示收藏和编辑
			    	if($.cookie('userId')){
			    		$("#LAY_jieAdmin").append("<span class='layui-btn layui-btn-xs jie-admin' type='edit'><a href='/fly/html/jie/add.html?postId="+data.postId+"'>编辑此贴</a></span>");
			    		$("#LAY_jieAdmin").append("<span class='layui-btn layui-btn-xs jie-admin' id='addMark'>收藏</span>");
			    	}
			    	$("#detailTitle").append("<a href='/fly/html/user/home.html?userId="+data.postUserid+"' class='fly-link'><cite>"+data.postUsername+"</cite></a>");
			    	$("#detailTitle").append("<span>"+dateFormat(data.postCreatetime)+"</span>")
			    	
			    	//解析出帖子内容
			    	$("#content").text(fly.content(data.postContent));
			    	var ul=document.getElementById("jieda");
			    	for(var i=0;data.listReply.length>i;i++){
			    		var replyUserid=data.listReply[i].replyUserid;
			    		var url='/fly/html/user/home.html?userId='+replyUserid;
			    		var li = document.createElement("li");
			    		var parentdiv=$('<div></div>'); 
			    		parentdiv.addClass('detail-about detail-about-reply');
			    		parentdiv.append("<a class='fly-avatar' href="+url+"><img src='/fly/res/images/top.jpg'></a>");
			    		var childdiv=$('<div></div>');
			    		childdiv.addClass('fly-detail-user');
			    		childdiv.append("<a href="+url+" class='fly-link'><cite id='replyName'>"+data.listReply[i].replyUsername+"</cite></a>");
			    		childdiv.appendTo(parentdiv);
			    		parentdiv.append("<div class='detail-hits'><span id='replyTime'>"+dateFormat(data.listReply[i].replyTime)+"</span></div>");
			    		if(data.listReply[i].replyIsend==1){
			    			parentdiv.append("<i class='iconfont icon-caina' title='最佳答案'></i>");
			    		}
			    		$(li).append(parentdiv);
			    		
			    		var context=fly.content(data.listReply[i].replyContent);
			    		$(li).append("<div class='detail-body jieda-body photos' id='content'>"+context+"</div>");
			    		
			    		var childdiv2=$('<div></div>');
			    		childdiv2.addClass('jieda-reply');
			    		childdiv2.append("<span class='jieda-zan' type='zan'><i class='iconfont icon-zan'></i><em>0</em></span><span type='reply'><i class='iconfont icon-svgmoban53'></i> 回复</span>");
			    		if(data.listReply[i].replyIsend==0){
			    			childdiv2.append("<div class='jieda-admin'><span class='jieda-accept' type='accept'>采纳</span></div>")
			    		}
			    		$(li).append(childdiv2);
						ul.appendChild(li);						
			    	}
			    }
			})
			$("#header").load("/fly/html/common/header.html");
			$("#typeName").load("/fly/html/common/column.html");
			
			
			form.on('submit(addReply)', function(data){
				if($.cookie('userId')){
					$.ajax({
			            url: layui.data('url').bbsUrl+"/reply/addReply.action",
			            type:'post',
			            data: data.field,
			            headers: {
		             				 'X-Token':$.cookie('X-Token')
		          				},
			            success: function (data) {
			            	if(data.status==1){
			            		top.layer.msg('回复成功', {icon: 1});
			            		setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
									window.location.reload();//页面刷新
								},1000);
			            	}else{
			            		top.layer.msg('回复失败', {icon: 5});
			            	}
			            }
	        		});
				}else{
					top.layer.msg('请先登录', {icon: 5});
				}
				 
				return false;
			})
			
			$("#addMark").on('click',function(){
				if($.cookie('userId')){
					$.ajax({
			            url: layui.data('url').bbsUrl+"/mark/addMark.action",
			            type:'post',
			            data: {markUserid:$.cookie('userId'),markUsername:$.cookie('userName'),markPostid:postId[1],markPosttopic:$("#postTopic").text()},
			            headers: {
		             				 'X-Token':$.cookie('X-Token')
		          				},
			            success: function (data) {
			            	if(data.status==1){
			            		top.layer.msg('已收藏', {icon: 1});
			            		$(this).text('');
			            	}else{
			            		top.layer.msg('收藏失败', {icon: 5});
			            	}
			            }
	        		});
				}else{
					top.layer.msg('请先登录', {icon: 5});
				}
				
			});
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