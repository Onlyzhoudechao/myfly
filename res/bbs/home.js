
layui.use(['layer','form'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;
 			 if(!$.cookie('userId')){
 			 	window.location.href='login.html';
 			 }
 		$("#header").load("/fly/html/common/header.html");
 		var postId=GetRequest();
 		console.log(postId);
 		console.log($.cookie('userId'));
 		var userIdi;
 		if(postId){
 			userIdi=postId[1];
 		}else{
 			userIdi=$.cookie('userId');
 		}
			$.ajax({
				method : "get",
				url:layui.data('url').bbsUrl+"buser/getBuser/"+userIdi+".action",
				dataType:"json", 
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	var address=data.userAddress==null ? '中国':data.userAddress;
			    	var userDescription=data.userDescription==null? '没有言语':data.userDescription;
			    		$("#user_name").text(data.userName);
				    	$("#joinDate").text(dateFormat(data.userJoindate)+" 加入");
				    	$("#address").text("来自"+address);
				    	$("#description").text("("+userDescription+")");
				    	$("#recently").text(data.userName+" 最近提问");
				    	$("#answer").text(data.userName+"最近回答");
				    	var ul=document.getElementById("post");
				    	//循环添加帖子的内容
				    	for(var i=0;i<data.list.length;i++){
				    		var li = document.createElement("li");
				    		if(data.list[i].postIsbest==1){
				    			$(li).append("<span class='fly-jing'>精</span>");
				    		}
				    		//获取帖子的ID
				    		var postId=data.list[i].postId;
				    		var postReadnum=data.list[i].postReadnum==null ? 0:data.list[i].postReadnum;
				    		var postAnswernum=data.list[i].postAnswernum==null ? 0:data.list[i].postAnswernum;
				    		var url='/fly/html/jie/detail.html?postId='+postId;
				    		$(li).append("<a href="+url+" class='jie-title'>"+ data.list[i].postTopic+"</a>");
				    		$(li).append("<i>"+dateFormat(data.list[i].postCreatetime)+" 创建</i>");
				    		$(li).append("<em class='layui-hide-xs'>"+postReadnum+"阅/"+postAnswernum+"答</em>");
				    		ul.appendChild(li);
				    	}
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


