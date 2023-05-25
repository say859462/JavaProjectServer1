package com.example;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Timer;
import java.util.TimerTask;

@RestController
public class TimerController {

    @GetMapping("/timer/{duration}/{username}")
    public ResponseEntity<String> startTimer(@PathVariable long duration, @PathVariable final String username) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                // 在這裡執行你想要執行的動作

                // 例如印出使用者名稱
                System.out.println("執行動作 - 使用者：" + username);
            }
        }, duration * 1000); // 將秒數轉換為毫秒

        return new ResponseEntity<>("Timer started", HttpStatus.OK);
    }
}
