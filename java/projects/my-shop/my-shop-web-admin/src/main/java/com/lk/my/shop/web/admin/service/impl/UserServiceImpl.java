package com.lk.my.shop.web.admin.service.impl;

import com.lk.my.shop.domain.User;
import com.lk.my.shop.web.admin.dao.UserDao;
import com.lk.my.shop.web.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author: lk
 * @Date: 2020/11/3 13:55
 * @Version: 1.0
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    public User login(String email, String password) {
        return userDao.getUser(email, password);

    }
}
