package com.blackhat.snake;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class SnakeGameApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SnakeGameApplication.class, args);
    }
}