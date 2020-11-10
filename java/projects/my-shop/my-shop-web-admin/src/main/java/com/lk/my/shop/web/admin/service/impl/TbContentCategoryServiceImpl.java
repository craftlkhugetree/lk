package com.lk.my.shop.web.admin.service.impl;

import com.lk.my.shop.domain.TbContentCategory;
import com.lk.my.shop.web.admin.dao.TbContentCategoryDao;
import com.lk.my.shop.web.admin.service.TbContentCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: lk
 * @Date: 2020/11/10 9:01
 * @Version: 1.0
 */
@Service
public class TbContentCategoryServiceImpl implements TbContentCategoryService {

    @Autowired
    private TbContentCategoryDao tbContentCategoryDao;

    @Override
    public List<TbContentCategory> selectAll() {
        return tbContentCategoryDao.selectAll();
    }
}
