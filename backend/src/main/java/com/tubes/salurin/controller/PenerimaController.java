package com.tubes.salurin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/penerima")
public class PenerimaController {

    @GetMapping("/dashboard")
    public String userDashboard() {
        return "Welcome USER!";
    }
}

