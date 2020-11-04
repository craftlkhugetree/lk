package com.lk.shop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @Author: lk
 * @Date: 2020/11/3 9:05
 * @Version: 1.0
 */

@Controller
public class MainController {

    @RequestMapping(value = "main",method = RequestMethod.GET)
    public String main(){
        return "main";
    }
}
