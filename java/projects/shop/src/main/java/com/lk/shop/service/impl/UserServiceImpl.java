package com.lk.shop.service.impl;

import com.lk.shop.commons.context.SpringContext;
import com.lk.shop.dao.UserDao;
import com.lk.shop.entity.User;
import com.lk.shop.service.UserService;
import org.springframework.stereotype.Service;

/**
 * @Author: lk
 * @Date: 2020/10/31 15:14
 * @Version: 1.0
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {
    public void sayHi() {
        System.out.println("hi");
    }

    private UserDao userDao = SpringContext.getBean("userDao");

    public User login(String email, String password) {
        return userDao.getUserByEmailAndPassword(email, password);

    }
}
