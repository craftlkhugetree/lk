package com.lk.my.shop.web.admin.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/11/13 15:35
 * @Version: 1.0
 */
@Controller
public class UploadController {

    private static final String UPLOAD_PATH = "/static/upload/";

    /**
     * 合并dropZone和wangEditor
     * @param dropzFile
     * @param editorFile
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    public Map<String, Object> upload(MultipartFile dropzFile, MultipartFile editorFile, HttpServletRequest request) {

        Map<String, Object> result = new HashMap<>();
//        System.out.println(request.getSession().getServletContext().getRealPath("/"));
        MultipartFile myFile = (dropzFile != null) ? dropzFile : editorFile;

        // 获取上传的原始文件名
        String fileName = myFile.getOriginalFilename();
        // 设置文件上传路径
        String filePath = request.getSession().getServletContext().getRealPath(UPLOAD_PATH);
        // 获取文件后缀        beginIndex -- 起始索引（包括）；endIndex -- 结束索引（不包括）
        String fileSuffix = fileName.substring(fileName.lastIndexOf("."), fileName.length());

        // 判断并创建上传用的文件夹
        File file = new File(filePath);
        if (!file.exists()) {
            file.mkdir();
        }
        // 重新设置文件名为 UUID，以确保唯一，防止重复上传的覆盖
        file = new File(filePath, UUID.randomUUID() + fileSuffix);

        try {
            // 写入文件
            myFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (dropzFile != null) {
            // 返回 JSON 数据，这里只带入了文件名
            result.put("fileName", UPLOAD_PATH + file.getName());
        }
        else if (editorFile != null){
            // scheme:http/https
            String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
            result.put("errno", 0);
            result.put("data", new String[] {serverPath + UPLOAD_PATH + file.getName()});
        }
        return result;
    }
}
