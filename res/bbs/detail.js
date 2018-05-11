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