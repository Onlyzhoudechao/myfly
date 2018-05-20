
layui.use(['layer','form','laypage'], function(){
 			 var $=layui.jquery
 			 ,layer=layui.layer
 			 ,laypage = layui.laypage
 			 ,form=layui.form;
 		var limits=3;
		var mytotal;
		var marktotal;	 
 		 $("#header").load("/fly/html/common/header.html");
		
		  
		  getPostByUserId();
		  getMarkByUserId();
		  laypage.render({
				    elem: 'page'
				    ,count:mytotal  //数据总数
				    ,limit:limits
				    ,jump: function(obj,first){
				    	if(!first){
				    		getPostByUserId(obj.curr);
				    	}
				    }
		  });
		  laypage.render({
				    elem: 'page2'
				    ,count: marktotal //数据总数
				    ,limit:limits
				    ,jump: function(obj,first){
				    	if(!first){
				    		getMarkByUserId(obj.curr);
				    	}
				    }
		  });
		  
		  //根据用户ID查询出用户已发表的帖子
		  function getPostByUserId(page){
			  	var curr;
			  	if(!page){
			  		curr=1;
			  	}else{
			  		curr=page;
			  	}
			  	$.ajax({
					method : "get",
					url:layui.data('url').bbsUrl+"post/getPostByUserId/"+$.cookie('userId')+".action",
					dataType:"json",  
					async:false,
					data:{limit:limits,curr:curr},
					contentType:"application/json;charset=utf-8",
					headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
					success:function(res){
						mytotal=res.count;
						$("#postNum").html(res.count);
						var ul=document.getElementById("myPost");
						//点击下一页的时候，把上一页的东西清除掉
						$(ul).find("li").remove();
						for(var i=0;res.data.length>i;i++){
							var postId=res.data[i].post_id;
						    var url='/fly/html/jie/detail.html?postId='+postId;
						    var url2='/fly/html/jie/add.html?postId='+postId;
							var li = document.createElement("li");
				             
							$(li).append("<a class='jie-title' href="+url+" target='_blank'>"+res.data[i].post_topic+"</a>");
							$(li).append("<i>"+dateFormat(res.data[i].post_createTime)+"</i>&");
							if(res.data[i].post_isEnd==1){
								$(li).append("<i>&nbsp;&nbsp;&nbsp;已结</i>");
							}else{
								$(li).append("<i>&nbsp;&nbsp;&nbsp;未结</i>");
							}
							var postReadnum;
							var postAnswernum;
							if(res.data[i].post_readNum && res.data[i].post_answerNum){
								postReadnum=res.data[i].post_readNum;
								postAnswernum=res.data[i].post_answerNum;
							}else{
								postReadnum=0;
								postAnswernum=0;
							}
							$(li).append("<a class='mine-edit' href="+url2+">编辑</a> ");
							$(li).append("<em>"+postReadnum+"阅/"+postAnswernum+"答</em>");
							ul.appendChild(li);
						}
					}
				})
		  }
		  
		  
		   //根据用户ID查询出用户已收藏的帖子
		  function getMarkByUserId(page){
			  	var curr;
			  	if(!page){
			  		curr=1;
			  	}else{
			  		curr=page;
			  	}
			  	$.ajax({
					method : "get",
					url:layui.data('url').bbsUrl+"mark/getMarkByUserId/"+$.cookie('userId')+".action",
					dataType:"json",  
					async:false,
					data:{limit:limits,curr:curr},
					contentType:"application/json;charset=utf-8",
					headers: {
             				 'X-Token':$.cookie('X-Token')
          				},
					success:function(res){
						marktotal=res.count;
						$("#markPostnum").html(res.count);
						var ul=document.getElementById("markPost");
						//点击下一页的时候，把上一页的东西清除掉
						$(ul).find("li").remove();
						for(var i=0;res.data.length>i;i++){
							var postId=res.data[i].markPostid;
						    var url='/fly/html/jie/detail.html?postId='+postId;
							var li = document.createElement("li");
							$(li).append("<a class='jie-title' href="+url+" target='_blank'>"+res.data[i].markPosttopic+"</a>");
							$(li).append("<i>&nbsp;&nbsp;收藏于 "+dateFormat(res.data[i].markCreatetime)+"</i>&");
							ul.appendChild(li);
						}
					}
				})
		  }

})
