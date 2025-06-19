package com.tubes.salurin.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.repository.AdminRepository;

@Configuration
public class AdminRegisterSalurin {
    @Bean
    public CommandLineRunner createAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder){
        return args ->{
            String adminEmail = "admin@salurin.com";
            String adminPassword = "Admin123!";
            boolean exists = adminRepository.findByEmail(adminEmail).isPresent();
            if (!exists){
                Admin admin = new Admin();
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setName("Admin Aplikasi");
                admin.setRole("ADMIN");
                adminRepository.save(admin);
            }
        };
    }
}
