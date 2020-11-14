package com.lk.my.shop.domain;

import com.lk.my.shop.commons.persistence.BaseEntity;
import lombok.Data;

/**
 * @Author: lk
 * @Date: 2020/11/10 8:55
 * @Version: 1.0
 */
@Data
public class TbContentCategory extends BaseEntity {
    private Long parentId;
    private String name;
    private Integer status;
    private Integer sortOrder;
    private Boolean isParent;
//
//    public Long getParentId() {
//        return parentId;
//    }
//
//    public void setParentId(Long parentId) {
//        this.parentId = parentId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Integer getStatus() {
//        return status;
//    }
//
//    public void setStatus(Integer status) {
//        this.status = status;
//    }
//
//    public Integer getSortOrder() {
//        return sortOrder;
//    }
//
//    public void setSortOrder(Integer sortOrder) {
//        this.sortOrder = sortOrder;
//    }
//
//    public Boolean getIsParent() {
//        return isParent;
//    }
//
//    public void setIsParent(Boolean parent) {
//        isParent = parent;
//    }
}
