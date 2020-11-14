package com.lk.my.shop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lk.my.shop.commons.persistence.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 定义实体类
 * @Author: lk
 * @Date: 2020/11/4 11:13
 * @Version: 1.0
 */
@Data
public class TbUser extends BaseEntity {
    private String username;
    @JsonIgnore
    private String password;
    private String phone;
    private String email;
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    @JsonIgnore
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }

}
