package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.domain.TbContentCategory;
import com.lk.my.shop.web.admin.service.TbContentCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
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

        List<TbContentCategory> targetList = new ArrayList<>();
        List<TbContentCategory> sourceList = tbContentCategoryService.selectAll();

        sortList(sourceList,targetList,0L);
        // 需要jstl来forEach，所以要model
        model.addAttribute("tbContentCategories", targetList);
        return "content_category_list";
    }

    /**
     * 分类排序，有一个父节点，就要递归地找出其所有子节点，并按顺序放在展示数组内
     * @param sourceList    数据源合集
     * @param targetList    排序后的集合
     * @param parentId
     */
    private void sortList(List<TbContentCategory> sourceList, List<TbContentCategory> targetList, Long parentId){
        for (TbContentCategory tbContentCategory: sourceList){
            // 包装类必须用 equals();比较，不能用==
            if (tbContentCategory.getParentId().equals(parentId)) {
                targetList.add(tbContentCategory);
                // 如果有子节点，继续全局追加
                if (tbContentCategory.getIsParent()) {
                    for (TbContentCategory contentCategory: sourceList) {
                        if (contentCategory.getParentId().equals(tbContentCategory.getId())) {
                            sortList(sourceList, targetList, tbContentCategory.getId());
                            break;
                        }
                    }
                }
            }

        }
    }


    /**
     * 测试包装类和基本数据类型
     * @param args
     */
    public static void main(String[] args) {
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
    }
}
