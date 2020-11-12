package com.lk.my.shop.web.admin.web.controller;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.commons.dto.PageInfo;
import com.lk.my.shop.domain.TbContent;
import com.lk.my.shop.web.admin.service.TbContentService;
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
import java.util.List;

/**
 * @Author: lk
 * @Date: 2020/11/11 14:59
 * @Version: 1.0
 */
@Controller
@RequestMapping(value = "content")
public class ContentController {

    @Autowired
    private TbContentService tbContentService;

    /**
     * 表单初始化
     * @param id
     * @return
     */
    @ModelAttribute
    public TbContent getTbContent(Long id){
        TbContent tbContent = null;

        if (id != null){
            tbContent = tbContentService.getById(id);
        }
        else{
            tbContent = new TbContent();
        }

        return tbContent;
    }

    /**
     * 跳转到内容列表
     * @param model
     * @return
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    public String list(Model model){
        List<TbContent> tbContents = tbContentService.selectAll();
        model.addAttribute("tbContents",tbContents);
        return "content_list";
    }

    /**
     * 跳转到内容表单
     //     * @param model
     * @return
     */
    @RequestMapping(value = "form", method = RequestMethod.GET)
    public String form(){
//    public String form(Model model){
//        TbContent TbContent = new TbContent();
//        model.addAttribute("TbContent",TbContent);
        return "content_form";
    }

    /**
     * 新增或编辑用户后，保存
     * @param tbContent
     * @param model
     * @param redirectAttributes
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public String save(TbContent tbContent,Model model, RedirectAttributes redirectAttributes) {
        BaseResult baseResult = tbContentService.save(tbContent);

        if (baseResult.getStatus() == 200){
            // 一次性的session
            redirectAttributes.addFlashAttribute("baseResult",baseResult);
            return "redirect:/content/list";
        }
        else{
            model.addAttribute("baseResult",baseResult);
            return "content_form";
        }
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
            tbContentService.deleteMulti(idArray);
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
    public PageInfo<TbContent> page(HttpServletRequest req, TbContent tbContent) {
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
        PageInfo<TbContent> pageInfo = tbContentService.page(start, length, draw, tbContent);
//        for (TbContent TbContent:TbContents) {
//            System.out.println(TbContent.getUsername());
//        }
//        int count = TbContentService.count();
//        result.put("draw",draw);
//        result.put("recordsTotal",count);
//        result.put("recordsFiltered",count);
//        result.put("data",TbContents);
//        result.put("error","");

        return pageInfo;
    }

    @RequestMapping(value = "detail", method = RequestMethod.GET)
    public String detail(TbContent tbContent){
        return "content_detail";
    }
}

