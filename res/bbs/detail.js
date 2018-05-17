layui.use(['layer','form'], function(){
			 var bbsUrl="http://127.0.0.1:8080/oneManageM/";
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,form=layui.form;

		$(function(){
			var postId=GetRequest();
			$.ajax({
				method : "get",
				url:bbsUrl+"post/getPost/"+postId+".action",
				dataType:"json",  
			    contentType:"application/json;charset=utf-8",
			    success:function(data){
			    	$("#postTopic").text(data[0].post_topic);
			    	if(data[0].post_typeName){
			    		$("#detail").append("<span class='layui-badge layui-bg-green fly-detail-column'>"+data[0].post_typeName+"</span>");
			    	}
			    	if(data[0].post_isBest==1){
			    		$("#detail").append("<span class='layui-badge layui-bg-red'>精帖</span>");
			    	}
			    	if(data[0].post_isEnd==1){
			    		$("#detail").append("<span class='layui-badge' style='background-color: #5FB878;'>已结</span>");
			    	}else{
			    		$("#detail").append("<span class='layui-badge' style='background-color: #5FB878;'>未结</span>");
			    	}
			    	$("#read").text(data[0].post_answerNum);
			    	$("#look").text(data[0].post_readNum);
			    	$("#userName").text(data[0].post_userName);
			    	$("#time").text(dateFormat(data[0].post_createTime));
			    	$("#content").text(data[0].post_content);
			    	var ul=document.getElementById("jieda");
			    	for(var i=0;data.length>i;i++){
			    		var postId=data[i].postId;
			    		var url='/fly/html/jie/detail.html?postId='+postId;
			    		var li = document.createElement("li");
			    		var parentdiv=$('<div></div>'); 
			    		parentdiv.addClass('detail-about detail-about-reply');
			    		parentdiv.append("<a class='fly-avatar' href=''><img src='https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg' alt=' '></a>");
			    		var childdiv=$('<div></div>');
			    		childdiv.addClass('fly-detail-user');
			    		childdiv.append("<a href="+url+" class='fly-link'><cite id='replyName'>"+data[i].reply_userName+"</cite></a>");
			    		childdiv.appendTo(parentdiv);
			    		parentdiv.append("<div class='detail-hits'><span id='replyTime'>"+dateFormat(data[i].reply_Time)+"</span></div>");
			    		if(data[i].reply_isEnd==1){
			    			parentdiv.append("<i class='iconfont icon-caina' title='最佳答案'></i>");
			    		}
			    		$(li).append(parentdiv);
			    		$(li).append("<div class='detail-body jieda-body photos' id='content'>"+data[i].reply_content+"</div>");
			    		
			    		var childdiv2=$('<div></div>');
			    		childdiv2.addClass('jieda-reply');
			    		childdiv2.append("<span class='jieda-zan' type='zan'><i class='iconfont icon-zan'></i><em>0</em></span><span type='reply'><i class='iconfont icon-svgmoban53'></i> 回复</span>");
			    		if(data[i].reply_isEnd==0){
			    			childdiv2.append("<div class='jieda-admin'><span class='jieda-accept' type='accept'>采纳</span></div>")
			    		}
			    		$(li).append(childdiv2);
						ul.appendChild(li);						
			    	}
			    }
			})
		})

})

//获取url后面带过来的参数
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   if (url.indexOf("?") != -1) {    //判断是否有参数
      var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
   }
   return strs[1];
}