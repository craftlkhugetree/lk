package com.lk.my.shop.web.admin.service.impl;

import com.lk.my.shop.commons.dto.BaseResult;
import com.lk.my.shop.commons.dto.PageInfo;
import com.lk.my.shop.commons.utils.RegexpUtils;
import com.lk.my.shop.domain.TbUser;
import com.lk.my.shop.web.admin.dao.TbUserDao;
import com.lk.my.shop.web.admin.service.TbUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 实现业务逻辑接口
 * @Author: lk
 * @Date: 2020/11/4 11:26
 * @Version: 1.0
 */

@Service
public class TbUserServiceImpl implements TbUserService {

    @Autowired
    private TbUserDao tbUserDao;

    @Override
    public List<TbUser> selectAll() {
        return tbUserDao.selectAll();
    }

    @Override
    public BaseResult save(TbUser tbUser) {
        BaseResult baseResult = checkTbUser(tbUser);
        if (baseResult.getStatus() == BaseResult.STATUS_SUCCESS){
            tbUser.setUpdated(new Date());

            // 新增
            if (tbUser.getId() == null){
                tbUser.setPassword(DigestUtils.md5DigestAsHex(tbUser.getPassword().getBytes()));
                tbUser.setCreated(new Date());
                tbUserDao.insert(tbUser);
            }
            // 编辑
            else {
                tbUserDao.update(tbUser);
            }
            baseResult.setMessage("成功");
        }
        return baseResult;
    }

    @Override
    public void delete(Long id) {
        tbUserDao.delete(id);
    }

    @Override
    public TbUser getById(Long id) {
        return tbUserDao.getById(id);
    }

    @Override
    public void update(TbUser tbUser) {
        tbUserDao.update(tbUser);
    }

    @Override
    public List<TbUser> selectByUsername(String username) {
        return tbUserDao.selectByUsername(username);
    }

    @Override
    public TbUser login(String email, String password) {
        TbUser tbUser = tbUserDao.getByEmail(email);
//        System.out.println(DigestUtils.md5DigestAsHex("123456".getBytes()));
        // 明文密码加密后与数据库中的比较
        if (tbUser != null){
            String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
            if (md5Password.equals(tbUser.getPassword())){
                return tbUser;
            }
        }
        return null;
    }

    private BaseResult checkTbUser(TbUser tbUser) {
        BaseResult baseResult = BaseResult.success();

        // 非空验证
//        if (tbUser.getUsername() == null || tbUser.getUsername().trim().length() == 0){
        if (StringUtils.isBlank(tbUser.getEmail())) {
            baseResult = BaseResult.fail("email不能为空");
        }
        else if (!RegexpUtils.checkEmail(tbUser.getEmail())){
            baseResult = BaseResult.fail("邮箱格式有误");
        }
        else if (StringUtils.isBlank(tbUser.getUsername())) {
            baseResult = BaseResult.fail("姓名不能为空");
        }
        else if (StringUtils.isBlank(tbUser.getPassword())) {
            baseResult = BaseResult.fail("密码不能为空");
        }
        else if (StringUtils.isBlank(tbUser.getPhone())) {
            baseResult = BaseResult.fail("phone不能为空");
        }
        else if (!RegexpUtils.checkPhone(tbUser.getPhone())){
            baseResult = BaseResult.fail("手机格式有误");
        }
        return baseResult;
    }

    @Override
    public List<TbUser> search(TbUser tbUser) {
       return tbUserDao.search(tbUser);
    }

    @Override
    public void deleteMulti(String[] ids) {
        tbUserDao.deleteMulti(ids);
    }

    /**
     * 分页查询
     * @param start
     * @param length
     * @return
     */
    @Override
    public PageInfo<TbUser> page(int start, int length, int draw, TbUser tbUser) {
        Map<String, Object> params = new HashMap<>();
        params.put("start",start);
        params.put("length",length);
        params.put("tbUser",tbUser);

        int count = tbUserDao.count(tbUser);

        PageInfo<TbUser> pageInfo = new PageInfo<>();
        pageInfo.setDraw(draw);
        pageInfo.setData(tbUserDao.page(params));
        pageInfo.setRecordsFiltered(count);
        pageInfo.setRecordsTotal(count);

        return pageInfo;
    }

    @Override
    public int count(TbUser tbUser) {
        return tbUserDao.count(tbUser);
    }
}
