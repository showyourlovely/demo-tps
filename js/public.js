//ajax跨域：
	//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+txt+"&cb=fn
	//$.ajax({
	//      type:"get",
	//      url:"https://api.douban.com/v2/book/search?q=css&callback=fn&start=0&count=10";,
	//      dataType:"jsonp",
	//      jsonCallback:"fn"   //设置回调函数
	//});
	//function  fn(msg){
	//  alert( msg );
	//}
//请求头POST
	//xmlobj.setRequestHeader("cache-control","no-cache");
	//xmlobj.setRequestHeader("contentType","text/html;charset=uft-8") //指定发送的编码
	//xmlobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");  //设置请求头信息
//url :路径
//callback ： 回调函数  服务器处理后将结果返回
//data ： 参数 （可选）  放到最后
function ajaxGet(url,callback,data){
	var ajax = null;
	var result = 0;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if( data ){
		url = url + "?" + data;
	}
	ajax.open("get",url);
	ajax.send();
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			// ajax.responseText;//服务器返回的结果到客户端     客户端对于 ajax.responseText处理是可变的 
			//通过回调函数的调用  将服务器处理的结果返回到客户端上
			callback( ajax.responseText );
		}
	}
}
//通过Promise对象 封装ajax
function ajaxPromise(url,data){
	if( data ){
		url = url + "?" + data;
	}
	var pro = new Promise(function(success,failed){
		var ajax = new XMLHttpRequest();
		ajax.open("get",url);
		ajax.send();
		ajax.onreadystatechange = function(){
			if( ajax.readyState == 4 && ajax.status == 200 ){
				//请求服务器的数据成功了
				success(ajax.responseText);
			}
		}
		//承诺   多长时间后   如果请求服务器失败了 就执行failed
		setTimeout(function(){
			failed("请求数据失败了");
		},5000)
	})
	//promise对象执行完成后  将该对象返回
	return pro;
}
	//document.onclick = function(){
	//	var promise = ajaxPromise("daeta.json");
	//	promise.then(function(msg){
	//		alert( msg );
	//	},function(msg){
	//		alert(msg);
	//	})
	//}
	
//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}
//动态创建元素
function createEle(ele){
	return document.createElement(ele);
}
//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}
//返回随机六位验证码
function getCode(){
	var arrStr = [];//存6个满足条件的字符
	for( var i = 0 ; i < 6 ; i++ ){
		var code = rand(48,122);
		if( code>=58&&code<=64 || code>=91&&code<=96 ){
			//重抽  i恢复原来的值
			i--;
		}else{
			arrStr[i] = String.fromCharCode(code);
		}
	}
	return arrStr.join("");
}
//日期时间格式封装
function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//倒计时
	//var start = new Date();//当前时间
	////如果时分秒默认  默认是早上08:00:00
	//var end = new Date("2017-12-21 19:54:00");//结束时间
	//var t = diff( start ,end );
	//
	////时间显示
	//function showTime(){
	//	//剩余的小时
	//	var h = parseInt(t/3600);
	//	//剩余的分钟 = 剩余的秒数  / 60: 
	//	var m = parseInt( (t - h*3600)/60 );
	//	//剩余的秒数
	//	var s = parseInt(t - h*3600 - m * 60);
	//	$id("p1").innerHTML = h + "小时" + m + "分钟" + s + "秒";
	//}
	//showTime();
	//
	//var timer = setInterval(function(){
	//	t--;
	//	if( t < 0 ){
	//		$id("p1").innerHTML = "商品已过期";
	//		clearInterval(timer);
	//	}else{
	//		showTime();
	//	}
	//},1000)
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}
//将一个字符串转成日期
function stringToDate(str){
    return  new Date(str);
}
//定义一个时间差函数  
function timeDiff(start,end){
	return Math.abs( start.getTime()-end.getTime() ) / 1000;
}
////设置cookie
//function setCookie(key,value,day){
//	if( day ){
//		var d = new Date();
//		d.setDate( d.getDate() + day );
//		document.cookie = key + "=" + value + ";expires=" + d;
//	}else{
//		document.cookie = key + "=" + value;
//	}
//}
//获取cookie
//function getCookie(key){
//	//判断是否有cookie
//	if( document.cookie ){
//		var str = document.cookie;
//		var arr = str.split("; ");
//		for( var i = 0 ; i < arr.length ; i++ ){
//			var item = arr[i].split("=");
//			if( item[0] == key ){
//				return item[1];//返回key对应的value值 是一个字符串
//			}
//		}
//		//循环结束后   没有对应的key   就返回一个""
//		return ""; //说明有cookie  但是没有key
//	}
//	//如果没有cookie  返回一个""
//	return "";// 说明没有cookie
//}

//删除cookie   -1  或  ""
function removeCookie(key){
	//document.cookie = key + "= '';expires=-1" 
	setCookie(key , "" , -1);
}
//获取cookie
function getCookie(key){
	cookie_info = document.cookie;
	if (cookie_info) {
		//由于取出来的cookie信息 可能会包含其他的数据，而这些数据的特点是 用 ；分隔的 ，并且还会有一些多余的空白和分号
		//将cookie中的信息空白和分号都替换成 ；   然后用分号分隔成数组
		list = cookie_info.replace(/;\s/g,";").split(';');
		//循环这个list数组   将数组中=后面的值取出来  存入到一个新的变量中
		for (var i=0;i<list.length;i++) {
			item = list[i].split('=');
			if (item[0] == key) {
				//满足条件 将之前cookie中的信息存入到新变量中
				oldCookie = item[1];
				return JSON.parse(oldCookie); //返回一个 数组
			}
		}
		//console.log(cookie_info)
		return [];//如果cookie中 没有想要的 键值   也返回一个空数组		
	}
	return [];// 如果cookie中没有值，返回一个空数组
}
//设置cookie信息
function setCookie(key,value,exdays){
	var now = new Date();
	now.setTime(now.getTime()+exdays*24*60*60*1000);
	document.cookie=key+"="+value+";"+"Expires"+"="+now+";";
}
//碰撞返回true，没有碰撞返回false
	function inPz(obj1,obj2){
		var L1 = obj1.offsetLeft;
		var R1 = obj2.offsetWidth-obj1.offsetLeft-obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj2.offsetHeight-obj1.offsetTop-obj1.offsetHeight;
		
		if (L1<0 || R1<0 || T1<0 || B1<0){
			return true;
		}else{
			return false;
		}
	}
	function pz(obj1,obj2){
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetWidth + obj1.offsetLeft;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetHeight + obj1.offsetTop;
		
		var L2 = obj2.offsetLeft;
		var R2 = obj2.offsetWidth + obj2.offsetLeft;
		var T2 = obj2.offsetTop;
		var B2 = obj2.offsetHeight + obj2.offsetTop;
		
		//如果碰不上   返回false  碰上了就返回true
		if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
			return false;
		}else{
			return true; //碰上了
		}
	}
//obj 操作的元素
//json 参数为 要操作的属性和目标值   键--属性    值--目标值
//callback 回调函数
var flag;//开关变量  当值为true时，表示 所有的动作都执行完毕 ，可以关掉定时器 ，也可以进入下一个动作
function startMove(obj,json,callback){//attr表示要操作的属性
		
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		flag = true;
		
		var current = 0;
		
		for(var attr in json){
			
			if( attr =="opacity" ){//操作透明度
				//获取透明度的样式值
				current =parseFloat( getStyle(obj,attr) )*100; 
				
			}else if( attr == "zIndex" ){
				current =parseInt( getStyle(obj,attr)  ) ;//接收当前元素的样式值
			}else{
				current =parseInt( getStyle(obj,attr)  ) ;//接收当前元素的样式值
			}
			
			
			var speed = (json[attr] - current)/10;
			
			
			speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
			
			
			if( current != json[attr] ){//动作完成后的条件  
				flag = false;//当目标值和当前的样式值 不相等时  ， 将开关变量值关闭 false 
			}
				
			//定时器开启时  不停的改变元素的样式
			if( attr == "opacity" ){
				obj.style.opacity = (current+speed)/100;
			}else if( attr=="zIndex" ){
				obj.style.zIndex = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
		//循环结束后判断flag的值，当值为true时，表示 所有的动作都执行完毕 ，可以关掉定时器 ，也可以进入下一个动作
		if( flag ){
			clearInterval(obj.timer);
			//上一个动作完成后 就开启下一个动作的执行    调用callback
			//判断 callback是否存在 存在就调用
			if( callback ){
				callback();
			}
		}
	},30)
}

//获取样式值函数
function getStyle(obj,attr){
	if( window.getComputedStyle ){
 		return window.getComputedStyle( obj,false )[attr];
 	}else{
 		return obj.currentStyle[attr];
 	}
}
//deg为初始小球角度,r为大球半径(轨迹半径),小球沿大球(轨迹)进行圆周运动
	//var deg = 90;
	//var r = 250;
	//var timer = null;
	//var circle = document.getElementById("circle");
	//var ball = document.getElementById("ball");
	//var centerPoint = {
	//	x : circle.offsetLeft + circle.offsetWidth/2,
	//	y : circle.offsetTop + circle.offsetHeight/2
	//}
	//timer = setInterval(function(){
	//	ball.style.left = centerPoint.x + r*Math.cos(deg*Math.PI/180) - ball.offsetWidth/2 + "px";
	//	ball.style.top = centerPoint.y - r*Math.sin(deg*Math.PI/180) - ball.offsetHeight/2 + "px";
	//	deg += 3;
	//},30)
//不精确的圆周运动
	//var ball = document.getElementById("ball");
	//var r = 200; // 运动轨迹的半径
	//var deg = 90; //初始角度
	////圆心坐标
	//var centerPoint = {
	//	x : ball.offsetLeft + ball.offsetWidth/2,
	//	y : r + ball.offsetHeight + ball.offsetTop
	//}
	//var timer = null;
	//timer = setInterval(function(){
	//	ball.style.left = centerPoint.x + r*Math.cos( deg*Math.PI/180 ) + "px";
	//	ball.style.top = centerPoint.y - r*Math.sin( deg*Math.PI/180 ) + "px";
	//	deg -= 2;
	//},30)
//不太精确的椭圆
	//var ball = document.getElementById("ball");
	//var b = 200; // 短轴
	//var a = 400; //长轴
	//var deg = 90; //初始角度
	////圆心坐标
	//var centerPoint = {
	//	x : ball.offsetLeft + ball.offsetWidth/2,
	//	y : b + ball.offsetHeight + ball.offsetTop
	//}
	//var timer = null;
	//timer = setInterval(function(){
	//	ball.style.left = centerPoint.x + a*Math.cos( deg*Math.PI/180 ) + "px";
	//	ball.style.top = centerPoint.y - b*Math.sin( deg*Math.PI/180 ) + "px";
	//	deg -= 2;
	//},30)
//顶部悬浮	
	//var oNav  = document.getElementById("Q-nav");
	//window.onscroll = function(){
	//	var h = 168;
	//	var sTop = document.body.scrollTop || document.documentElement.scrollTop;
	//	if( sTop > h ){
	//		//吸顶   固定定位  并且 top 设置为 0
	//		oNav.style.position = "fixed";
	//		oNav.style.top = 0;
	//	}else{
	//		oNav.style.position = "static";
	//	}
	//}
	
//反弹 ： 速度反向,重力球，重力球
	//var oBtn = document.getElementById("btn");
	//var oDiv = document.getElementById("ball");
	//var speedX = 7;
	//var speedY = -18;//初始方向如果是负数 向上运动      正数  向下运动
	//var timer = null;
	//oBtn.onclick = function(){
	//	timer = setInterval(function(){
	//		oDiv.style.left = oDiv.offsetLeft + speedX + "px";
	//		oDiv.style.top = oDiv.offsetTop + speedY++ + "px";//speedY++  重力加速度原理
	//		
	//		//向上运动到某个边缘处 向下运动
	//		/*if( oDiv.offsetTop < 0  ){
	//			oDiv.style.top = 0;
	//		}*/
	//		
	//		//当小球落地后 反弹  
	//		if( oDiv.offsetTop > window.innerHeight - oDiv.offsetHeight ){
	//			oDiv.style.top = window.innerHeight - oDiv.offsetHeight + "px";
	//			speedY *= -0.6; //反弹   小球落地后 会有能量损失  不会弹回原来的高度  speedY *= -0.8
	//			
	//			//小球落地后 横向速度也有能量损失
	//			speedX--;
	//			if( speedX < 0 ){
	//				speedX = 0;
	//				clearInterval(timer);
	//			}
	//		}
	//	},30)
	//}
//允许跨域请求数据
	//header("Access-Control-Allow-Origin:*");//在任何域下都可以访问该服务器文件的数据
//百度jsonp接口： 	https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+txt+"&cb=fn
