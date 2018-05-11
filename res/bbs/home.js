layui.use(['layer','form'], function(){
			 var bbsUrl="http://127.0.0.1:8080/oneManageM/";
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 			 
 	 var localSession=layui.sessionData('user');
 		 //加载头部数据
  		$("#header").load("/fly/html/common/header.html",function(responseTxt,statusTxt,xhr){
  			if(statusTxt=="success"){
	 			if(localSession.userName!=null){
	 				$("#userName").text(localSession.userName);
	 				document.getElementById("nologin").style.display="none";
	 				document.getElementById("logined").style.display="block";
	 			}
  			}
  			 /*document.getElementById("logout").onclick(function(){
 		   		alert("666")
 		  	 });*/
  		});
  		
 		$(function(){
			$.ajax({
				method : "get",
				url:bbsUrl+"buser/getBuser/"+localSession.userId+".action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
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
			    		var postId=data[i].postId;
			    		var url='/fly/html/jie/detail.html?postId='+postId;
			    		$(li).append("<a href="+url+" class='jie-title'>"+ data[i].postTopic+"</a>");
			    		$(li).append("<i>"+dateFormat(data[i].postCreateTime)+"创建</i>");
			    		$(li).append("<em class='layui-hide-xs'>"+data[i].postReadNum+"阅/"+data[i].postAnswerNum+"答</em>");
			    		ul.appendChild(li);
			    	}
			    	
			    }
			});
		})
 		
 		  
 		 
})


	 

