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
  		});
 		 
})


	 

