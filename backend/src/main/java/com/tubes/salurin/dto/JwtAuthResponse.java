package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

// hasil copas, belum test
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String userEmail;
    private String userRole;
}