package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.commons.constant.ConstantUtils;
import com.lk.my.shop.commons.utils.CookieUtils;
import com.lk.my.shop.domain.User;
import com.lk.my.shop.web.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.lk.my.shop.commons.constant.ConstantUtils.COOKIE_NAME_USER_INFO;

/**
 * @Author: lk
 * @Date: 2020/11/3 13:58
 * @Version: 1.0
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
    public String login(@RequestParam(required=true) String email, @RequestParam(required = true) String password, HttpServletRequest req, HttpServletResponse resp){
        User user = userService.login(email, password);
        boolean isRemember = req.getParameter("isRemember") == null ? false : true;

        if(!isRemember){
            CookieUtils.deleteCookie(req,resp,COOKIE_NAME_USER_INFO);
        }

        if (user == null){
            req.setAttribute("message","用户名或密码错误。");
            return login();
        }
        else{
            if(isRemember){
                CookieUtils.setCookie(req,resp,COOKIE_NAME_USER_INFO,String.format("%s:%s",email,password),7*24*60*60);
            }
            // 记录登录信息放入会话
            req.getSession().setAttribute(ConstantUtils.SESSION_USER,user);
            return "redirect:/main";
        }
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest httpServletRequest){
       httpServletRequest.getSession().invalidate();
       return login();
//       return "login";
    }
}
