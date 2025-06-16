package com.tubes.salurin.service.impl;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.tubes.salurin.entity.User;
import com.tubes.salurin.service.JwtService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JwtService {

    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours
    private static final String SECRET = "my-super-secret-jwt-key-that-is-very-secure"; // Use .env in production

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    @Override
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    @Override
    public boolean isTokenValid(String token, User user) {
        return extractEmail(token).equals(user.getEmail()) && !isExpired(token);
    }

    private boolean isExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
