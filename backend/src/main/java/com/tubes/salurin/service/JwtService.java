package com.tubes.salurin.service;

import com.tubes.salurin.entity.User;

public interface JwtService {
    String generateToken(User user);
    String extractEmail(String token);
    boolean isTokenValid(String token, User user);
}
