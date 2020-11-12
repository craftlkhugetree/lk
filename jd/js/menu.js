/*让hover不那么灵敏*/
class Menu  {
    constructor(id){
        this.box = document.querySelector(id);
        this.ul = this.box.querySelector("ul")
        this.lis = this.box.querySelectorAll("li")
        console.log(this.lis)
        this.subMenuEles = this.box.querySelectorAll(".sub-menu")
        console.log(this.subMenuEles)
        this.timer1 = null
        this.timer2 = null

        this.init()
    }
    init(){
        console.log("menu")

        this.lis.forEach((element) => {
            element.addEventListener("mouseenter", (e) => {
                let li =e.target
                console.log("mouseenter1",li)

                if(this.timer1 !== null){
                    clearTimeout(this.timer1)   /*非常有用，随时清除timer防抖，只留一个使得鼠标划过好几个main-menu时200ms内不显示其他main-menu*/
                }
                this.timer1 = setTimeout(() =>{
                    this.subMenuEles.forEach((element) =>{
                        element.classList.remove("active")
                    })
                    console.log(li.children[1].classList)
                    li.children[1].classList.add("active")  /*恢复焦点的active，来显示子菜单,children俩元素main和sub */

                },200)
            })
            
        });

        this.lis.forEach((item) => {
            item.addEventListener("mouseleave", (e) => {
                let li = e.target
                console.log("mouseenter2")

                if(this.timer2 !== null){
                    clearTimeout(this.timer2)   /*非常有用，随时清除timer防抖，只留一个使得鼠标划过好几个main-menu时200ms内不显示其他main-menu*/
                }
                this.timer2 = setTimeout(() =>{
                    console.log(li.children[1].classList)
                    li.children[1].classList.remove("active")   /*当鼠标离开就移除active，隐藏子菜单*/
                },200)
            })
        });

    }
}