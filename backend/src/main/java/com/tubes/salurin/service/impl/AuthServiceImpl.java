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

    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        CampaignOwner owner = new CampaignOwner();
        owner.setName(request.getName());
        owner.setEmail(request.getEmail());
        owner.setPassword(passwordEncoder.encode(request.getPassword()));
        owner.setPhone(request.getPhone());
        owner.setOrganization(request.getOrganization());
        ownerRepo.save(owner);
        return new AuthResponse(jwtService.generateToken(owner), "OWNER");
        
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            authManager.authenticate(
                 new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }


         CampaignOwner owner = ownerRepo.findByEmail(request.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException("Campaign Owner not found"));

    return new AuthResponse(jwtService.generateToken(owner), "OWNER");
    }

    @Override
    public AuthResponse loginAdmin(LoginRequest request) {
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid admin credentials");
        }

        Admin admin = adminRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        return new AuthResponse(jwtService.generateToken(admin), "ADMIN");
    }
}
