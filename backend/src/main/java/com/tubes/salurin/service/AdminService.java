package com.tubes.salurin.service;

import org.springframework.stereotype.Service;

import com.tubes.salurin.model.Admin;
import com.tubes.salurin.model.Campaigner;
import com.tubes.salurin.model.Donater;
import com.tubes.salurin.model.User;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignerRepository;
import com.tubes.salurin.repository.DonaterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final DonaterRepository donaterRepository;
    private final CampaignerRepository campaignerRepository;
    private final AdminRepository adminRepository;

    public void removeUser(User user){
        if (user instanceof Donater){
            donaterRepository.delete((Donater) user);
        } else if (user instanceof Campaigner){
            campaignerRepository.delete((Campaigner) user);
        } else if (user instanceof Admin){
            adminRepository.delete((Admin) user);
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }
    }
}
