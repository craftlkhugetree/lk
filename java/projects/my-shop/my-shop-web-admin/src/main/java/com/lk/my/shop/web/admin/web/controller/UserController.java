package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.domain.TbUser;
import com.lk.my.shop.web.admin.service.TbUserService;
import com.lk.my.shop.web.admin.service.impl.TbUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * @Author: lk
 * @Date: 2020/11/5 11:01
 * @Version: 1.0
 */

@Controller
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    private TbUserService tbUserService;

    /**
     * 表单初始化
     * @param id
     * @return
     */
    @ModelAttribute
    public TbUser getTbUser(Long id){
        TbUser tbUser = null;

        if (id != null){
            tbUser = tbUserService.getById(id);
        }
        else{
            tbUser = new TbUser();
        }

        return tbUser;
    }

    /**
     * 跳转到用户列表
     * @param model
     * @return
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String list(Model model){
        List<TbUser> tbUsers = tbUserService.selectAll();
        model.addAttribute("tbUsers",tbUsers);
        return "user_list";
    }

    /**
     * 跳转到用户表单
//     * @param model
     * @return
     */
    @RequestMapping(value = "form", method = RequestMethod.GET)
    public String form(){
//    public String form(Model model){
//        TbUser tbUser = new TbUser();
//        model.addAttribute("tbUser",tbUser);
        return "user_form";
    }

    /**
     * 新增或编辑用户后，保存
     * @param tbUser
     * @param model
     * @param redirectAttributes
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public String save(TbUser tbUser,Model model, RedirectAttributes redirectAttributes) {
        BaseResult baseResult = tbUserService.save(tbUser);

        if (baseResult.getStatus() == 200){
            // 一次性的session
            redirectAttributes.addFlashAttribute("baseResult",baseResult);
            return "redirect:/user/list";
        }
        else{
            model.addAttribute("baseResult",baseResult);
            return "user_form";
        }
    }

    @RequestMapping(value = "search", method = RequestMethod.POST)
    public String search(TbUser tbUser,Model model) {
        List<TbUser> tbUsers = tbUserService.search(tbUser);
        model.addAttribute("tbUsers",tbUsers);
        return "user_list";
    }
}
