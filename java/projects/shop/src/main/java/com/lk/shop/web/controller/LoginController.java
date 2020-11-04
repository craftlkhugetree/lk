package com.lk.shop.web.controller;

import com.lk.shop.entity.User;
import com.lk.shop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import static com.sun.xml.internal.ws.api.model.wsdl.WSDLBoundOperation.ANONYMOUS.required;

/**
*   @Author: lk
*   @Date: 2020/10/31 15:10
*   @Version: 1.0
*/
@Controller
public class LoginController {

    // 就一个，自动装配，所以@Service那边也可以去掉value值
    @Autowired
    private UserService userService;

    /**
     * 跳转登录页面
     * @return
     */
    // 当浏览器路径为默认或者login，且为get请求，那就调用下列的login()方法。
    @RequestMapping(value = {"","login"}, method = RequestMethod.GET)
    public String login() {
        // 配置过suffix，所以不用加jsp后缀
        return "login";
    }

    /**
     * 登录逻辑
     * @param email
     * @param password
     * @return
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    // 必须的参数 required=true
    public String login(@RequestParam(required=true) String email, @RequestParam(required = true) String password, HttpServletRequest httpServletRequest){
        User user = userService.login(email, password);

        if (user == null){
            return login();
        }
        else{
            // 记录登录信息放入会话
            httpServletRequest.getSession().setAttribute("user",user);
            return "redirect:/main";
        }
    }
}
