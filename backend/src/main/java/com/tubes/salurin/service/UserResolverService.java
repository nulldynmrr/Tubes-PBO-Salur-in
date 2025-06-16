package com.tubes.salurin.service;

import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.repository.DonorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Primary
@RequiredArgsConstructor
public class UserResolverService implements UserDetailsService {

    private final DonorRepository donorRepo;
    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.tubes.salurin.entity.User user = donorRepo.findByEmail(email).orElse(null);

        if (user == null) {
            user = ownerRepo.findByEmail(email).orElse(null);
        }

        if (user == null) {
            user = adminRepo.findByEmail(email).orElse(null);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        String role = (user instanceof com.tubes.salurin.entity.Admin) ? "ADMIN"
                    : (user instanceof com.tubes.salurin.entity.CampaignOwner) ? "OWNER"
                    : "DONOR";

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();
    }


}
