package com.tubes.salurin.service;

import com.tubes.salurin.model.*;
import com.tubes.salurin.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final DonaterRepository donaterRepository;
    private final CampaignerRepository campaignerRepository;
    private final AdminRepository adminRepository;

    public void removeUser(User user) {
        if (user instanceof Donater) {
            donaterRepository.delete((Donater) user);
        } else if (user instanceof Campaigner) {
            campaignerRepository.delete((Campaigner) user);
        } else if (user instanceof Admin) {
            adminRepository.delete((Admin) user);
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }
    }
}
