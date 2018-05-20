
layui.use(['layer','form'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 		$("#header").load("/fly/html/common/header.html");
			$.ajax({
				method : "get",
				url:layui.data('url').bbsUrl+"buser/getBuser/"+$.cookie('userId')+".action",
				dataType:"json", 
				headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	if(data.length>0){
			    		$("#user_name").text(data[0].userName);
				    	$("#joinDate").text(dateFormat(data[0].userJoinDate)+"加入");
				    	$("#address").text("来自"+data[0].userAddress);
				    	$("#description").text("("+data[0].userDescription+")");
				    	$("#recently").text(data[0].userName+" 最近提问");
				    	$("#answer").text(data[0].userName+"最近回答");
				    	var ul=document.getElementById("post");
				    	//循环添加帖子的内容
				    	for(var i=0;i<data.length;i++){
				    		var li = document.createElement("li");
				    		if(data[i].postIsBest==1){
				    			$(li).append("<span class='fly-jing'>精</span>");
				    		}
				    		//获取帖子的ID
				    		var postId=data[i].postId;
				    		var url='/fly/html/jie/detail.html?postId='+postId;
				    		$(li).append("<a href="+url+" class='jie-title'>"+ data[i].postTopic+"</a>");
				    		$(li).append("<i>"+dateFormat(data[i].postCreateTime)+"创建</i>");
				    		$(li).append("<em class='layui-hide-xs'>"+data[i].postReadNum+"阅/"+data[i].postAnswerNum+"答</em>");
				    		ul.appendChild(li);
				    	}
			    	}
			    }
			});
			
})


