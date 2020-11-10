package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.domain.TbContentCategory;
import com.lk.my.shop.web.admin.service.TbContentCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * 内容分类管理
 * @Author: lk
 * @Date: 2020/11/10 9:07
 * @Version: 1.0
 */
@Controller
@RequestMapping(value = "content/category")
public class ContentCategoryController {

    @Autowired
    private TbContentCategoryService tbContentCategoryService;

    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String list(Model model) {
        int i = 128;
        Integer i2 = 128;
        Integer i3 = new Integer(128);
        //Integer会自动拆箱为int，所以为true
        System.out.println(i == i2);
        System.out.println(i == i3);
        System.out.println("**************");
        Integer i5 = 127;//java在编译的时候,被翻译成-> Integer i5 = Integer.valueOf(127);
        Integer i6 = 127;
        System.out.println(i5 == i6);//true

        Integer ii5 = new Integer(127);
        System.out.println(i5 == ii5); //false 这是两个对象了，地址肯定不一样。
        Integer i7 = new Integer(123);
        Integer i8 = new Integer(123);
        System.out.println(i7 == i8);  //false

        List<TbContentCategory> tbContentCategories = tbContentCategoryService.selectAll();
        // 需要jstl来forEach，所以要model
        model.addAttribute("tbContentCategories",tbContentCategories);
        return "content_category_list";
    }
}
