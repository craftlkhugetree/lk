package com.lk.my.shop.web.admin.dao.impl;

import com.lk.my.shop.domain.User;
import com.lk.my.shop.web.admin.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * @Author: lk
 * @Date: 2020/11/3 13:47
 * @Version: 1.0
 */

@Repository
public class UserDaoImpl implements UserDao {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserDaoImpl.class);

    public User getUser(String email, String password) {
        logger.debug("调用getUser(),参数为{} {}",email,password);

        User user = null;
        if("admin@lk.com".equals(email)){
            if("admin".equals(password)){
                user = new User();
                user.setEmail("admin@lk.com");
                user.setUsername("lk");
                logger.info("成功获取用户信息{}",user.getUsername());
            }
        }
        else{
            logger.warn("获取信息失败");
        }
        return user;
    }
}
