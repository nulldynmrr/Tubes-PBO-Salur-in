package com.tubes.salurin.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String organization; // optional if donor
    private String role; // "DONOR" or "OWNER"
}
