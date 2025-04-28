package com.blackhat.snake.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SnakeController {

    @GetMapping("/")
    public String snakegame() {
        return "index";
    }
}