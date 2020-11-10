package com.lk.my.shop.commons.persistence;

import java.io.Serializable;
import java.util.Date;

/**
 * 实体类的基类
 * @Author: lk
 * @Date: 2020/11/9 14:03
 * @Version: 1.0
 */
public abstract class BaseEntity implements Serializable {
    private Long id;
    private Date created;
    private Date updated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}
