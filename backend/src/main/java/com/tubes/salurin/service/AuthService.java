package com.tubes.salurin.service;

import com.tubes.salurin.dto.*;
import com.tubes.salurin.model.*;
import com.tubes.salurin.repository.*;
import com.tubes.salurin.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final DonaterRepository donaterRepository;
    private final CampaignerRepository campaignerRepository;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()) || userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Email atau Username sudah terdaftar");
        }

        User user;

        switch (req.getRole()) {
            case DONATER -> {
                Donater d = new Donater();
                if (req.getAnonymous()) {
                    d.setUsername(generateRandomString("user_"));
                    d.setEmail(generateRandomString("anonymous") + "@anon.mail");
                    d.setContactNumber(generateRandomDigits());
                    d.setAnonymous(true);
                } else {
                    d.setUsername(req.getUsername());
                    d.setEmail(req.getEmail());
                    d.setContactNumber(req.getContactNumber());
                    d.setAnonymous(false);
                }
                d.setPassword(passwordEncoder.encode(req.getPassword()));
                donaterRepository.save(d);
                user = d;
            }
            case CAMPAIGNER -> {
                Campaigner c = new Campaigner();
                c.setUsername(req.getUsername());
                c.setEmail(req.getEmail());
                c.setPassword(passwordEncoder.encode(req.getPassword()));
                c.setContactNumber(req.getContactNumber());
                c.setAddress(req.getAddress());
                c.setCategory(req.getCategory());
                campaignerRepository.save(c);
                user = c;
            }
            case ADMIN -> {
                Admin a = new Admin();
                a.setUsername(req.getUsername());
                a.setEmail(req.getEmail());
                a.setPassword(passwordEncoder.encode(req.getPassword()));
                adminRepository.save(a);
                user = a;
            }
            default -> throw new RuntimeException("Role tidak valid");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, req.getRole().name());
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email atau Password salah");
        }

        String role = user instanceof Admin ? "ADMIN"
                    : user instanceof Campaigner ? "CAMPAIGNER"
                    : user instanceof Donater ? "DONATER"
                    : "UNKNOWN";

        return new AuthResponse(jwtService.generateToken(user), role);
    }

    private String generateRandomString(String prefix) {
        return prefix + UUID.randomUUID().toString().substring(0, 8);
    }

    private String generateRandomDigits() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            sb.append(rand.nextInt(10));
        }
        return sb.toString();
    }
}
