package com.tubes.salurin.security;

import java.util.List;
import java.util.Optional;

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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        Optional<CampaignOwner> owner = ownerRepository.findByEmail(email);
        if (owner.isPresent()){
            return new CustomUserDetails(owner.get(), List.of());
        }

        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()){
            return new CustomUserDetails(admin.get(), List.of());
        }

        throw new UsernameNotFoundException("User tidak ditemukan");
    }
}