package com.lk.my.shop.web.admin.service;

import com.lk.my.shop.domain.User;

/**
 * @Author: lk
 * @Date: 2020/11/3 13:54
 * @Version: 1.0
 */
public interface UserService {
    public User login(String email, String password);
}
