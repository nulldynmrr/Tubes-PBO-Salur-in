package com.tubes.salurin.service;

import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.entity.User;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;

import lombok.RequiredArgsConstructor;

@Service
@Primary
@RequiredArgsConstructor
public class UserResolverService implements UserDetailsService {
    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user = adminRepo.findByEmail(email).orElse(null);
        if (user == null) {
            user = ownerRepo.findByEmail(email).orElse(null);
        }
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        String role = (user instanceof Admin) ? "ADMIN" : "OWNER";
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();
    }
}
