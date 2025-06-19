package com.tubes.salurin.service.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.entity.CampaignOwner;
import com.tubes.salurin.entity.User;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user = adminRepo.findByEmail(email).orElse(null);

        if (user == null) {
            user = ownerRepo.findByEmail(email).orElse(null);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User tidak ditemukan dengan email: " + email);
        }

        return new CustomUserDetails(user, getAuthorities(user));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user){
        String role = (user instanceof Admin) ? "ROLE_ADMIN"
                    : (user instanceof CampaignOwner) ? "ROLE_OWNER"
                    : "ROLE_NULL";

        return List.of(new SimpleGrantedAuthority(role));
    }
}
