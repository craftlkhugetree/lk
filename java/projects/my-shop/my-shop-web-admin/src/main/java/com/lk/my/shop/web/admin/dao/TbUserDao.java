package com.lk.my.shop.web.admin.dao;

import com.lk.my.shop.domain.TbUser;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 定义数据访问接口
 * @Author: lk
 * @Date: 2020/11/4 11:21
 * @Version: 1.0
 */
@Repository
public interface TbUserDao {
    List<TbUser> selectAll();

    void insert(TbUser tbUser);

    void delete(Long id);

    TbUser getById(Long id);

    void update(TbUser tbUser);

    List<TbUser> selectByUsername(String username);
}
