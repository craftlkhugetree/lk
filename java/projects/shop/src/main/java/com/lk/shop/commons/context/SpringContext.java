package com.lk.shop.commons.context;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @Author: lk
 * @Date: 2020/10/31 15:05
 * @Version: 1.0
 */
@Component
public class SpringContext implements ApplicationContextAware {
    private static ApplicationContext applicationContext;
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
            SpringContext.applicationContext = applicationContext;
    }

    public static <T> T getBean(String beanId){
//        assertContextInjected();
        return  (T) applicationContext.getBean(beanId);
    }

    public static void assertContextInjected(){
        Validate.validState(applicationContext == null,"还没配置spring-context.xml");
    }
}
