package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.commons.dto.PageInfo;
import com.lk.my.shop.domain.TbUser;
import com.lk.my.shop.web.admin.service.TbUserService;
import com.lk.my.shop.web.admin.service.impl.TbUserServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /**
     * /user/search
     * @param tbUser
     * @param model
     * @return
     */
    @RequestMapping(value = "search", method = RequestMethod.POST)
    public String search(TbUser tbUser,Model model) {
        List<TbUser> tbUsers = tbUserService.search(tbUser);
        model.addAttribute("tbUsers",tbUsers);
        return "user_list";
    }

    /**
     * AJAX返回JSON
     * @param ids
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    public BaseResult delete(String ids){
        BaseResult baseResult = null;
        if (StringUtils.isNotBlank(ids)) {
            String[] idArray = ids.split(",");
            tbUserService.deleteMulti(idArray);
            baseResult = BaseResult.success("删除成功。");
        }
        else {
            baseResult = BaseResult.fail("删除失败");
        }
        return baseResult;
    }

    /**
     * 分页查询
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "page", method = RequestMethod.GET)
    public PageInfo<TbUser> page(HttpServletRequest req, TbUser tbUser) {
//        Map<String, Object> result = new HashMap<>();

        String strDraw = req.getParameter("draw");
        String strStart = req.getParameter("start");
        String strLength = req.getParameter("length");

        int draw = strDraw==null ? 0 : Integer.parseInt(strDraw);
        int start = strStart==null ? 0 : Integer.parseInt(strStart);
        int length = strLength==null ? 10 : Integer.parseInt(strLength);

//        Enumeration<String> parameterName = req.getParameterNames();
////        System.out.println(draw);
////        System.out.println(start);
////        System.out.println(length);
////        System.out.println(req);
////
////        while (parameterName.hasMoreElements()) {
////            System.out.println(String.format("key:%s,value:%s",parameterName.nextElement(),req.getParameter(parameterName.nextElement())));
//        }
        // 封装dataTables需要的结果
        PageInfo<TbUser> pageInfo = tbUserService.page(start, length, draw, tbUser);
//        for (TbUser tbUser:tbUsers) {
//            System.out.println(tbUser.getUsername());
//        }
//        int count = tbUserService.count();
//        result.put("draw",draw);
//        result.put("recordsTotal",count);
//        result.put("recordsFiltered",count);
//        result.put("data",tbUsers);
//        result.put("error","");

        return pageInfo;
    }

    @RequestMapping(value = "detail", method = RequestMethod.GET)
    public String detail(TbUser tbUser){
        return "user_detail";
    }
}
