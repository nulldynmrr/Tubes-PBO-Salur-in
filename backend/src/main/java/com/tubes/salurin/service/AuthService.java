package com.tubes.salurin.service;

import com.tubes.salurin.dto.AuthResponse;
import com.tubes.salurin.dto.LoginRequest;
import com.tubes.salurin.dto.RegisterRequest;

public interface AuthService {
    AuthResponse registerUser(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse loginAdmin(LoginRequest request);
}
