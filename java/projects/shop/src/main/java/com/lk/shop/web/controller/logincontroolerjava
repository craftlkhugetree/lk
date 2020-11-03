package com.lk.shop.web.controller;

import com.lk.shop.commons.context.SpringContext;
import com.lk.shop.commons.utils.CookieUtils;
import com.lk.shop.entity.User;
import com.lk.shop.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *   @Author: lk
 *   @Date: 2020/10/31 15:10
 *   @Version: 1.0
 */
@Controller
public class logincontrollerbk extends HttpServlet {
    public  static  final  String COOKIE_NAME_USER_INFO = "userInfo";

    private UserService userService = SpringContext.getBean("userService");


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        userService.sayHi();
        SpringContext context = new SpringContext();
        UserService userService = (UserService) context.getBean("userService");
        User admin = userService.login("admin@lk.com", "admin");
        System.out.println(admin);

        String userInfo = CookieUtils.getCookieValue(req,COOKIE_NAME_USER_INFO);
        System.out.println(userInfo);

        if (!StringUtils.isBlank(userInfo)){
            String[] userInfoArray = userInfo.split(":");
            String email = userInfoArray[0];
            String password = userInfoArray[1];
            req.setAttribute("email",email);
            req.setAttribute("password",password);
            req.setAttribute("isRemember",true);
        }
        req.getRequestDispatcher("/login.jsp").forward(req,resp);
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");
//        String message = null;
        boolean isRemember = req.getParameter("isRemember") == null ? false : true;
//        String isRemember = req.getParameter("isRemember");
//        System.out.println(isRemember);   // on null

//        SpringContext context = new SpringContext();
//        UserService userService = (UserService) context.getBean("userService");

        if(!isRemember){
            CookieUtils.deleteCookie(req,resp,COOKIE_NAME_USER_INFO);
        }
        User admin = userService.login(email,password);

        if(admin != null){
            if(isRemember){
                CookieUtils.setCookie(req,resp,COOKIE_NAME_USER_INFO,String.format("%s:%s",email,password),7*24*60*60);
            }
            resp.sendRedirect("/main.jsp");
        }

        else{
            req.setAttribute("message","用户名或密码错误。");
            req.getRequestDispatcher("/login.jsp").forward(req,resp);
        }
    }
}
