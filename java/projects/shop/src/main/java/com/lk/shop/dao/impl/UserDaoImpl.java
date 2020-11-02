package com.lk.shop.dao.impl;

import com.lk.shop.dao.UserDao;
import com.lk.shop.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * @Author: lk
 * @Date: 2020/10/31 15:50
 * @Version: 1.0
 */
@Repository(value = "userDao")
public class UserDaoImpl implements UserDao {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserDaoImpl.class);

    public User getUserByEmailAndPassword(String email, String password) {
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
