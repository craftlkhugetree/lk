class Slider {
    constructor(id){
        this.box = document.querySelector(id)
        this.picBox = this.box.querySelector("ul")
        this.indexBox = this.box.querySelector(".index-box")
        this.index = 1
        this.sliderWidth = this.box.clientWidth /*容器宽度,不带px*/
        console.log("shuxing:"+this.box.clientWidth)


        this.animated = false /*flag判断是否在移动中,移动中的点击被屏蔽*/
        this.sliders = this.picBox.children.length  /*开始是5张图，但是li后来因为copyPic()而变为7了，但是这个5不变*/
        this.auto = null
        this.init()

    }
    
    init(){
        console.log("slider")
        this.initPoint()
        this.copyPic()
        this.leftRight()
        this.play()
    }


    initPoint(){    /*生成索引的小圆点,与图片数对应。*/
        const num = this.picBox.children.length;    /*ul的children是li*/
        let frg = document.createDocumentFragment() //另一种方法是用border-radius:50%;就能生成

        for(let i=0; i< num; i++){
            let li = document.createElement("li")   /*准备在ol中生成li小圆点*/
            li.setAttribute("data-index",i+1)
            if(i===0){
                li.className = "active" /*第一个加红点亮*/
            }
            frg.appendChild(li)
        }
        var a=document.getElementsByTagName("li");
// for(var i in a) {
//     a[i].setAttribute("data-index", i);
//         console.log("look li"+i)
// }


        this.indexBox.children[0].style.width = num*10*2 + "px"
        /*选中ol标签，让圆点不要挤在一起，撑起来，动态在html添加了样式*/    
        this.indexBox.children[0].appendChild(frg)
        /**appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。 */
        console.log(this.indexBox.children[0])

        this.indexBox.children[0].addEventListener("click", (e)=>{
            console.log("point")
            let pointIndex =(e.target).getAttribute("data-index")
            let offset = (pointIndex-this.index) * this.sliderWidth
            this.index = pointIndex
            this.move(offset)   /*鼠标哪个圆点就到哪个图,因为图是横排的*/
            console.log(this.index)
        })
    }


    copyPic(){/*辅助图方案,五张图变为5123451*/
        const first = this.picBox.firstElementChild.cloneNode(true)
        const last = this.picBox.lastElementChild.cloneNode(true)
        this.picBox.appendChild(first)
        this.picBox.insertBefore(last,this.picBox.firstElementChild)

        this.picBox.style.width = this.sliderWidth * this.picBox.children.length + "px"
        this.picBox.style.left = -1 * this.sliderWidth + "px"
        /*这就不用在css里设置-590了，直接在js里搞定，轮播从第二位置开始*/
    }

    move(offset){
        this.animate(offset)
        const num = this.indexBox.children[0].children.length
        for (let i=0;i<num;i++){    /*清除ol里的li的类*/
            this.indexBox.children[0].children[i].className=""
        }
        // if(this.index===null){  /*点入圆点所在区域而不是圆点上，this.index就是null*/
        //     this.index=1
        // }
        this.indexBox.children[0].children[this.index-1].className = "active"
        /*给当前li增加active类，点亮圆点*/
    }

    animate(offset){    /*轮播图缓慢地滚动*/
        this.animated =true
        const time = 1000   /*1000ms切换*/
        const rate = 100
        let speed = offset / (time/rate)    /*隔一段时间有一次位移，缓慢移动*/
        let goal = parseFloat(this.picBox.style.left) - offset
        console.log("kankandanwei",this.picBox.style.left,offset,goal)
         /*parseFloat去掉了单位,就是控制ul的left值来移动*/
        let animate = setInterval(() =>{
            if(parseFloat(this.picBox.style.left)===goal || Math.abs(Math.abs(parseFloat(this.picBox.style.left))-Math.abs(goal))<Math.abs(speed)){/*到达目标位置goal或者离目标很近*/
                this.picBox.style.left  = goal+"px"
                clearInterval(animate)
                this.animated = false   /*移动到目的地就重置flag*/

                if(parseFloat(this.picBox.style.left)===0){
                    this.picBox.style.left = -this.sliders * this.sliderWidth +"px";    /*首5变成尾5*/
                }else if(parseFloat(this.picBox.style.left)=== -(this.sliders+1)*this.sliderWidth){
                    this.picBox.style.left = -this.sliderWidth +"px"    /*最后一个1变为第二个1*/
                         }
            }else{
                this.picBox.style.left = parseFloat(this.picBox.style.left)-speed + "px"
            }
        },rate)/*setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。*/



    }

    leftRight(){
        this.box.querySelector(".left-box").addEventListener("click", ()=>{
            console.log("leftArrow")
            if(this.animated){
                return;
            }
            if(this.index-1 < 1){
                this.index = this.sliders
            }else{
                this.index --
            }
            this.move(-this.sliderWidth)
        })
        this.box.querySelector(".right-box").addEventListener("click", ()=>{
            console.log("righttArrow")
            if(this.animated){
                return;
            }
            if(this.index+1 > this.sliders){
                this.index = 1
            }else{
                this.index ++
            }
            this.move(this.sliderWidth)
        })
    }

    play(){ /*只要鼠标不在图片，那就触发右箭头*/
        this.auto = setInterval(()=>{
            this.box.querySelector(".right-box").click()
        },2000)

        this.box.addEventListener("mouseenter", ()=>{
            clearInterval(this.auto)
        })

        this.box.addEventListener("mouseleave", ()=>{
            this.auto = setInterval(()=>{
                this.box.querySelector(".right-box").click()
            },2000)
        })
    }
};