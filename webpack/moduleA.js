var a = {
    name:'lk'
}

var SusanModule = (function(){
    var name='Susan1'
    var sex='female'
    return {
        tell : function(){
            console.log('my name is',name)
            console.log('my gender is',sex) //SusanModule.tell()
        }
    }
})()    //execute immediately


;(function(window){ //semicolon
    var name='Susan2'
    var sex='female'
    
    function tell(){
            console.log('my name is',name)
            console.log('my gender is',sex)
    }
    window.susanModule = {tell} //susanModule.tell()
   
})(window)  //early time's standard  module defination