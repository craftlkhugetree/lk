package com.lk.my.shop.web.admin.dao;

import com.lk.my.shop.domain.User;

/**
 * @Author: lk
 * @Date: 2020/11/3 13:46
 * @Version: 1.0
 */
public interface UserDao {
    public User getUser(String email, String password);
}
