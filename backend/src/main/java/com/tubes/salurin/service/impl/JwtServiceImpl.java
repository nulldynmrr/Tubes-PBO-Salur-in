package com.tubes.salurin.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.tubes.salurin.entity.User;
import com.tubes.salurin.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JwtService {
    private static final long EXPIRATION = 86400000;
    private static final String SECRET = "d0f1c1bc-a4c7-439e-bfd2-3542da27a751-d0f1c1bc-a4c7-439e";

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public String generateToken(User user){
        return Jwts.builder()
                   .claim("role", user.getRole())         
                   .setSubject(user.getEmail())
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                   .signWith(getSignKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    @Override
    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                   .setSigningKey(getSignKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    @Override
    public String extractEmail(String token){
        return extractAllClaims(token).getSubject();
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails){
        String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isExpired(token);
    }

    private boolean isExpired(String token){
        return extractAllClaims(token)
                   .getExpiration()
                   .before(new Date());
    }
}
