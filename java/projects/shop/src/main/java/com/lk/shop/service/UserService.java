package com.lk.shop.service;

import com.lk.shop.entity.User;

/**
 * @Author: lk
 * @Date: 2020/10/31 15:14
 * @Version: 1.0
 */
public interface UserService {
    void sayHi();
    public User login(String email, String password);

}
