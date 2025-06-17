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
import com.tubes.salurin.entity.Donor;
import com.tubes.salurin.entity.User;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.repository.DonorRepository;
import com.tubes.salurin.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final DonorRepository donorRepo;
    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = null;
        String role = "";

        if (donorRepo.findByEmail(email).isPresent()) {
            Donor donor = donorRepo.findByEmail(email).get();
            user = donor;
            role = "ROLE_DONOR";
        } else if (ownerRepo.findByEmail(email).isPresent()) {
            CampaignOwner owner = ownerRepo.findByEmail(email).get();
            user = owner;
            role = "ROLE_OWNER";
        } else if (adminRepo.findByEmail(email).isPresent()) {
            Admin admin = adminRepo.findByEmail(email).get();
            user = admin;
            role = "ROLE_ADMIN";
        } else {
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetails(user, List.of(new SimpleGrantedAuthority(role)));
    }

    public Collection<? extends GrantedAuthority> getAuthorities(User user) {
        String role = (user instanceof Donor) ? "ROLE_DONOR"
                    : (user instanceof CampaignOwner) ? "ROLE_OWNER"
                    : "ROLE_ADMIN";
        return List.of(new SimpleGrantedAuthority(role));
    }
}
