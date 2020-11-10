package com.lk.my.shop.web.admin.dao;

import com.lk.my.shop.domain.TbContentCategory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: lk
 * @Date: 2020/11/10 8:58
 * @Version: 1.0
 */

@Repository
public interface TbContentCategoryDao {
    List<TbContentCategory> selectAll();
}
