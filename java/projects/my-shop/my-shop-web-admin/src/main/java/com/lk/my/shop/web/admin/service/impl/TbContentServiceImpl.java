package com.lk.my.shop.web.admin.service.impl;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.commons.dto.PageInfo;
import com.lk.my.shop.commons.utils.RegexpUtils;
import com.lk.my.shop.domain.TbContent;
import com.lk.my.shop.web.admin.dao.TbContentDao;
import com.lk.my.shop.web.admin.service.TbContentService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: lk
 * @Date: 2020/11/11 10:54
 * @Version: 1.0
 */
@Service
public class TbContentServiceImpl implements TbContentService {

    @Autowired
    private TbContentDao tbContentDao;

    @Override
    public List<TbContent> selectAll() {
        return tbContentDao.selectAll();
    }

    @Override
    public BaseResult save(TbContent tbContent) {
        BaseResult baseResult = checkTbContent(tbContent);
        if (baseResult.getStatus() == BaseResult.STATUS_SUCCESS){
            tbContent.setUpdated(new Date());

            // 新增
            if (tbContent.getId() == null){
                tbContent.setCreated(new Date());
                tbContentDao.insert(tbContent);
            }
            // 编辑
            else {
                tbContentDao.update(tbContent);
            }
            baseResult.setMessage("成功");
        }
        return baseResult;
    }

    private BaseResult checkTbContent(TbContent tbContent) {
        BaseResult baseResult = BaseResult.success();

        // 非空验证
//        if (tbContent.getUsername() == null || tbContent.getUsername().trim().length() == 0){
        if (StringUtils.isBlank(tbContent.getTitle())) {
            baseResult = BaseResult.fail("title不能为空");
        }
//        else if (!RegexpUtils.checkEmail(tbContent.getContent())){
//            baseResult = BaseResult.fail("邮箱格式有误");
//        }
//        else if (StringUtils.isBlank(tbContent.getSubTitle())) {
//            baseResult = BaseResult.fail("姓名不能为空");
//        }
//        else if (StringUtils.isBlank(tbContent.getPic())) {
//            baseResult = BaseResult.fail("密码不能为空");
//        }
//        else if (StringUtils.isBlank(tbContent.getUrl())) {
//            baseResult = BaseResult.fail("phone不能为空");
//        }
//        else if (!RegexpUtils.checkPhone(tbContent.getTitleDesc())){
//            baseResult = BaseResult.fail("手机格式有误");
//        }
        return baseResult;
    }

    @Override
    public void delete(Long id) {
        tbContentDao.delete(id);
    }

    @Override
    public TbContent getById(Long id) {
        return tbContentDao.getById(id);
    }

    @Override
    public void update(TbContent tbContent) {
        tbContentDao.update(tbContent);
    }

    @Override
    public void deleteMulti(String[] ids) {
        tbContentDao.deleteMulti(ids);
    }

    @Override
    public PageInfo<TbContent> page(int start, int length, int draw, TbContent tbContent) {
        Map<String, Object> params = new HashMap<>();
        params.put("start",start);
        params.put("length",length);
        params.put("tbContent",tbContent);

        int count = tbContentDao.count(tbContent);

        PageInfo<TbContent> pageInfo = new PageInfo<>();
        pageInfo.setDraw(draw);
        pageInfo.setData(tbContentDao.page(params));
        pageInfo.setRecordsFiltered(count);
        pageInfo.setRecordsTotal(count);

        return pageInfo;
    }

    @Override
    public int count(TbContent tbContent) {
        return tbContentDao.count(tbContent);
    }
}
