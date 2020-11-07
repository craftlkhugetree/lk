package com.lk.my.shop.web.admin.service;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.domain.TbUser;

import java.util.List;

/**
 * 定义业务逻辑接口
 * @Author: lk
 * @Date: 2020/11/4 11:24
 * @Version: 1.0
 */
public interface TbUserService {
    List<TbUser> selectAll();

    BaseResult save(TbUser tbUser);

    void delete(Long id);

    TbUser getById(Long id);

    void update(TbUser tbUser);

    List<TbUser> selectByUsername(String username);

    TbUser login(String email, String password);

    List<TbUser> search(TbUser tbUser);
}
