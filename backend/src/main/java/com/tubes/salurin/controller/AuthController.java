package com.tubes.salurin.controller;

import com.tubes.salurin.dto.AuthResponse;
import com.tubes.salurin.dto.LoginRequest;
import com.tubes.salurin.dto.RegisterRequest;
import com.tubes.salurin.service.AuthService; 

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid; 

@RestController
@RequestMapping("/api/auth") 
@RequiredArgsConstructor 
public class AuthController {

    private final AuthService authService; 
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request 
    ) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(null, e.getMessage()));
        }
    }
    @PostMapping("/login") 
    public ResponseEntity<AuthResponse> login( 
            @Valid @RequestBody LoginRequest request 
    ) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, e.getMessage()));
        }
    }
}