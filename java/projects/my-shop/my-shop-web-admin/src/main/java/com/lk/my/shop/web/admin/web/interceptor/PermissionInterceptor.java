package com.lk.my.shop.web.admin.web.interceptor;

import com.lk.my.shop.commons.constant.ConstantUtils;
import com.lk.my.shop.commons.utils.CookieUtils;
import com.lk.my.shop.domain.TbUser;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.lk.my.shop.commons.constant.ConstantUtils.COOKIE_NAME_USER_INFO;

/**
 * @Author: lk
 * @Date: 2020/11/3 9:45
 * @Version: 1.0
 */
public class PermissionInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        String userInfo = CookieUtils.getCookieValue(httpServletRequest,COOKIE_NAME_USER_INFO);
        if (!StringUtils.isBlank(userInfo)){
            String[] userInfoArray = userInfo.split(":");
            String email = userInfoArray[0];
            String password = userInfoArray[1];
            httpServletRequest.setAttribute("password",password);
            httpServletRequest.setAttribute("email",email);
            httpServletRequest.setAttribute("isRemember",true);
        }


        return true;
    }

    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        // 以login结尾的请求
        if (modelAndView !=null && modelAndView.getViewName().endsWith("login")){
            TbUser user = (TbUser) httpServletRequest.getSession().getAttribute(ConstantUtils.SESSION_USER);
            if (user != null){
                httpServletResponse.sendRedirect("/main");
            }
        }
    }

    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
