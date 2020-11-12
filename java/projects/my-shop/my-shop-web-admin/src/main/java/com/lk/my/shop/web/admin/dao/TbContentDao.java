package com.lk.my.shop.web.admin.dao;

import com.lk.my.shop.domain.TbContent;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: lk
 * @Date: 2020/11/11 10:53
 * @Version: 1.0
 */
@Repository
public interface TbContentDao {
    List<TbContent> selectAll();

    void insert(TbContent tbContent);

    void delete(Long id);

    TbContent getById(Long id);

    void update(TbContent tbContent);

    void deleteMulti(String[] ids);

    /**
     * 真的分页查询
     * @param params：start和lengh
     * @return
     */
    List<TbContent> page(Map<String, Object> params);

    /**
     * 前端需要的total
     * @return
     */
    int count(TbContent tbContent);
}
