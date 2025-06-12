package com.tubes.salurin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/donatur")
public class DonaturController {

    @GetMapping("/dashboard")
    public String donaturDashboard() {
        return "Welcome Donatur!";
    }
}