package com.lk.my.shop.domain;

import com.lk.my.shop.commons.persistence.BaseEntity;
import lombok.Data;

/**
 * @Author: lk
 * @Date: 2020/11/11 10:32
 * @Version: 1.0
 */
@Data
public class TbContent extends BaseEntity {
    private Long categoryId;
    private String title;
    private String subTitle;
    private String titleDesc;
    private String url;
    private String pic;
    private String pic2;
    private String content;
    private TbContentCategory tbContentCategory;

//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getSubTitle() {
//        return subTitle;
//    }
//
//    public void setSubTitle(String subTitle) {
//        this.subTitle = subTitle;
//    }
//
//    public String getTitleDesc() {
//        return titleDesc;
//    }
//
//    public void setTitleDesc(String titleDesc) {
//        this.titleDesc = titleDesc;
//    }
//
//    public String getUrl() {
//        return url;
//    }
//
//    public void setUrl(String url) {
//        this.url = url;
//    }
//
//    public String getPic() {
//        return pic;
//    }
//
//    public void setPic(String pic) {
//        this.pic = pic;
//    }
//
//    public String getPic2() {
//        return pic2;
//    }
//
//    public void setPic2(String pic2) {
//        this.pic2 = pic2;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public void setContent(String content) {
//        this.content = content;
//    }
}
