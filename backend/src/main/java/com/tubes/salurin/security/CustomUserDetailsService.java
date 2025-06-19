package com.tubes.salurin.security;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.entity.CampaignOwner;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final CampaignOwnerRepository ownerRepository;
    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<CampaignOwner> owner = ownerRepository.findByEmail(email);
        if (owner.isPresent()) {
            CampaignOwner campaignOwner = owner.get();
            return new CustomUserDetails(campaignOwner, getAuthorities("OWNER"));
        }

        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            Admin adminUser = admin.get();
            return new CustomUserDetails(adminUser, getAuthorities("ADMIN"));
        }

        throw new UsernameNotFoundException("User tidak ditemukan dengan email: " + email);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
