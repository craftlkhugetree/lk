console.log(document.getElementById("a").innerHTML)
console.log(document.getElementsByClassName("c")[0].innerHTML)


$(document).ready(function(){
    console.log($("#a").html())
    console.log($(".c:eq(0)").html())
    console.log($("div:eq(1)").html())
    console.log($("div#a p:eq(0)").html())
    console.log($("div#a p:eq(2) span:eq(1)").html())
})


/**1.   $().hide()
 * 2.   $是jQ的顶级对象，等价于jQuery；DOM对象：用原生js获取的对象；jQ对象的本质是通过$把DOM元素进行了包装，以伪数组形式存储
 * 3.   $(DOM对象).play()不能实现，因为play()是js原生的方法。chrome要加muted才能自动播放。  
 * 4.   jQ转化为js：$(DOM对象)[0].play() ;  $(DOM对象).get(0).play()
 * 5.   
 * 6.   
 */