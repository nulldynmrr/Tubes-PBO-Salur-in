package com.tubes.salurin.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tubes.salurin.dto.AuthResponse;
import com.tubes.salurin.dto.LoginRequest;
import com.tubes.salurin.dto.RegisterRequest;
import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.entity.CampaignOwner;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.service.AuthService;
import com.tubes.salurin.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final CampaignOwnerRepository ownerRepository;
    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse registerUser(RegisterRequest request){
        CampaignOwner owner = new CampaignOwner();
        owner.setName(request.getName());
        owner.setEmail(request.getEmail());
        owner.setPassword(passwordEncoder.encode(request.getPassword()));
        owner.setPhone(request.getPhone());
        owner.setOrganization(request.getOrganization());
        owner.setRole("OWNER");
        ownerRepository.save(owner);
        return new AuthResponse(jwtService.generateToken(owner), owner.getEmail(), "OWNER");
    }

    @Override
    public AuthResponse login(LoginRequest request){
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CampaignOwner owner = ownerRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Email tidak ditemukan"));

        String role = "OWNER";
        String token = jwtService.generateToken(owner);

        return new AuthResponse(token, owner.getEmail(), role);
    }
    
    @Override
    public AuthResponse loginAdmin(LoginRequest request){
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Admin admin = adminRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Email tidak ditemukan"));

        String role = "ADMIN";
        String token = jwtService.generateToken(admin);

        return new AuthResponse(token, admin.getEmail(), role);
    }
}