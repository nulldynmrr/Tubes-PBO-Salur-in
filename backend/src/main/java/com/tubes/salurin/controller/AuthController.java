package com.tubes.salurin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tubes.salurin.dto.AuthResponse;
import com.tubes.salurin.dto.LoginRequest;
import com.tubes.salurin.dto.RegisterRequest;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final CampaignOwnerRepository campaignOwnerRepository;

    @PostMapping("/register/owner")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        if (campaignOwnerRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                             .body("Email sudah terdaftar");
        } else {
            return ResponseEntity.ok(authService.registerUser(request));
        }

    }

    @PostMapping("/login/owner")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/login/admin")
    public ResponseEntity<AuthResponse> loginAdmin(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginAdmin(request));
    }
}
