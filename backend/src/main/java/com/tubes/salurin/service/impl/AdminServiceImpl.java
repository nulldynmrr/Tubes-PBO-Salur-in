package com.tubes.salurin.service.impl;

import org.springframework.stereotype.Service;

import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.repository.DonorRepository;
import com.tubes.salurin.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final DonorRepository donorRepo;
    private final CampaignOwnerRepository ownerRepo;
    private final CampaignRepository campaignRepo;

    @Override
    public void deleteUserById(Long id){
        donorRepo.findById(id).ifPresentOrElse(
            donorRepo::delete,
            () -> ownerRepo.findById(id).ifPresentOrElse(
                ownerRepo::delete,
                () -> campaignRepo.findById(id).ifPresent(campaignRepo::delete)
            )
        );
    }
}
