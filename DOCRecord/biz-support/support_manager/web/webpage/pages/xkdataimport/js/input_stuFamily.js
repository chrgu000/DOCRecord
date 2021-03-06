var schoolList={};
var grade=['一','二','三','四','五','六'];

$(function(){
	$("#main-nav").load($.getRootPath()+"/webpage/pages/left/left.html",function(){
		$("header").load($.getRootPath()+"/webpage/pages/top/header.html",function(){
			$("#yhxxglzk").addClass("in");
			$("#yhxxgl").addClass("active");
			$("#drxsjz").addClass("active");			
		});

	});
	
	
	$.ajaxSeentao($.getRootPath()+"/area/getAllCity.rest",function(json){
		
		if(json.code===1){
			ischool.layout.hide();
			var obj = JSON.parse(json.data);
	
			var strn='<option value="0">请选择</option>';
			for (var int = 0; int < obj.length; int++) {
				
				strn +='<option value="'+obj[int].cCode+'">'+obj[int].cName+'</option>';
			}
			
			$("#ds").html(strn);
		}else{
			ischool.layout.error(json.errorMessage,2000);
		}

	});
	
	$("#ds").change(function(){
		var dscode=$("#ds").val();
		$.ajaxSeentao($.getRootPath()+"/area/getAllqx.rest",dscode,function(json){
			
			if(json.code===1){
				ischool.layout.hide();
				var obj = JSON.parse(json.data);
		
				var strn='<option value="0">请选择</option>';
				for (var int = 0; int < obj.length; int++) {
					
					strn +='<option value="'+obj[int].cCode+'">'+obj[int].cName+'</option>';
				}
				
				$("#qx").html(strn);
			}else{
				ischool.layout.error(json.errorMessage,2000);
			}

		});
	});
	$("#qx").change(function(){
		var dscode=$("#qx").val();
		$.ajaxSeentao($.getRootPath()+"/school/getSchoolByArea.rest",dscode,function(json){
			
			if(json.code===1){
				ischool.layout.hide();
				var obj = JSON.parse(json.data);
				schoolList=obj;
				var strn='<option value="0">请选择</option>';
				for (var int = 0; int < obj.length; int++) {
					
					strn +='<option value="'+obj[int].cSid+'">'+obj[int].cName+'</option>';
				}
				
				$("#school").html(strn);
			}else{
				ischool.layout.error(json.errorMessage,2000);
			}
			
		});
	});
	$("#school").change(function(){
		var id=$("#school").val();
		var schoolBean=getSchoolById(id);
		console.log(schoolBean);
		var strn='<option value="0">请选择</option>';
		if(schoolBean.cIskindergarten===1){
			strn +='<option value="-1">幼儿园</option>';
		}
		if(schoolBean.cIsprimary===1){
			strn +='<option value="1">小学</option>';
		}
		if(schoolBean.cIsjunior===1){
			strn +='<option value="2">初中</option>';
		}
		if(schoolBean.cSenior===1){
			strn +='<option value="3">高中</option>';
		}
		
		$("#schoolStage").html(strn);

	});
	$("#schoolStage").change(function(){
		var id=$("#school").val();
		var schoolBean=getSchoolById(id);
		var schoolStage=$("#schoolStage").val();
		
		var strn='<option value="0">请选择</option>';
		if(schoolStage==='-1'){
			strn +='<option value="-3">小班</option>';
			strn +='<option value="-2">中班</option>';
			strn +='<option value="-1">大班</option>';
		}else if(schoolStage==='1'){
			var i=0;
			if(schoolBean.cSchoolca==="633"){
				i=6;
			}else{
				i=5;
			}
			for (var int = 0; int < i; int++) {
				strn +='<option value="'+(int+1)+'">'+grade[int]+'年级</option>';
			}
		}else if(schoolStage==='2'){
			var i=0,n=0;
			if(schoolBean.cSchoolca==="633"){
				i=3,n=6;
			}else{
				i=4,n=5;
			}
			for (var int = 0; int < i; int++) {
				strn +='<option value="'+(int+1+n)+'">初中'+grade[int]+'年级</option>';
			}
		}else if(schoolStage==='3'){
			
			for (var int = 0; int < 3; int++) {
				strn +='<option value="'+(int+1+9)+'">高中'+grade[int]+'年级</option>';
			}
		}
		
		
		$("#gradenum").html(strn);
		
	});
	$("#gradenum").change(function(){
		var strn='<option value="0">请选择</option>';
		var schoolId=$("#school").val();
		var gradenum=$("#gradenum").val();
		var json1={};
		json1["schoolId"]=schoolId;
		json1["gradenum"]=gradenum;
		var sj = $.jsonToString(json1);
		$.ajaxSeentao($.getRootPath()+"/school/getClassById.rest",sj,function(json){
			
			if(json.code===1){
				ischool.layout.hide();
				var obj = JSON.parse(json.data);
				console.log(obj);
				var strn='<option value="0">请选择</option>';
				for (var int = 0; int < obj.length; int++) {
					
					strn +='<option value="'+obj[int].cClassid+'">'+obj[int].cClassname+'</option>';
				}
				
				$("#class").html(strn);
			}else{
				ischool.layout.error(json.errorMessage,2000);
			}
			
		});
		
	});
    $("#sub").click(function(){
        var classId=$("#class").val();
        var studentname=$("#studentName").val();
        var familyname=$("#familyName").val();
        var phone=$("#phone").val();
        if(classId && classId!=''&&studentname&&familyname&&phone&&studentname!=''
			&&familyname!=''&&phone!=''&&phone.length==11){
            var s=$("#fun").searchFormatSeentao();
            var sj = $.jsonToString(s);

            $.ajaxSeentao($.getRootPath()+"/xkUser/inputStuFamily.rest",sj,function(json){

                if(json.code===1){

                    ischool.layout.success(json.data,$.getRootPath()+'/webpage/pages/xkdataimport/input_stuFamily.html');

                }else{
                    ischool.layout.error(json.errorMessage,2000);
                }

            });
        }else{
            ischool.layout.error("缺少必要字段或填写内容不正确",2000);
		}

    });
});
function getSchoolById(id){
	
	for (var int = 0; int < schoolList.length; int++) {
		var sid = schoolList[int].cSid;
		if(sid==id){
			return schoolList[int];
		}
	}

}

