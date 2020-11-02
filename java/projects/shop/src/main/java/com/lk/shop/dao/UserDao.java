package com.lk.shop.dao;

import com.lk.shop.entity.User;

/**
 * @Author: lk
 * @Date: 2020/10/31 15:49
 * @Version: 1.0
 */
public interface UserDao {
    public User getUserByEmailAndPassword(String email, String password);

}
