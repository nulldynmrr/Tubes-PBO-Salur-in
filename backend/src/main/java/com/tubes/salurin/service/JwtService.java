package com.tubes.salurin.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.tubes.salurin.entity.User;

import io.jsonwebtoken.Claims;

public interface JwtService {
    String generateToken(User user);
    String extractEmail(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    Claims extractAllClaims(String token);
}
