package com.lk.my.shop.web.admin.service;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.commons.dto.PageInfo;
import com.lk.my.shop.domain.TbContent;

import java.util.List;

/**
 * @Author: lk
 * @Date: 2020/11/11 10:54
 * @Version: 1.0
 */
public interface TbContentService {
    List<TbContent> selectAll();

    BaseResult save(TbContent tbContent);

    void delete(Long id);

    TbContent getById(Long id);

    void update(TbContent tbContent);

    void deleteMulti(String[] ids);

    PageInfo<TbContent> page(int start, int length, int draw, TbContent tbContent);

    int count(TbContent tbContent);
}
