package com.tubes.salurin.controller;

import com.tubes.salurin.dto.JwtAuthResponse;
import com.tubes.salurin.dto.LoginRequest;
import com.tubes.salurin.dto.RegisterRequest;
import com.tubes.salurin.security.JwtTokenProvider;
import com.tubes.salurin.model.User;
import com.tubes.salurin.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        authService.registerUser(registerRequest);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        String token = tokenProvider.generateToken(authentication);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setAccessToken(token);
        response.setUserEmail(loginRequest.getEmail());
        response.setUserRole(authService.getUserRole(loginRequest.getEmail()));

        return ResponseEntity.ok(response);
    }
}