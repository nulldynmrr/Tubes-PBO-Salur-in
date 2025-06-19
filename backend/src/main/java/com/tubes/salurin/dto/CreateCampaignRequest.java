package com.tubes.salurin.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreateCampaignRequest {
    private String title;
    private String description;
    private String category;
    private String address;
    private double targetAmount;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private String ownerEmail;
    private MultipartFile imageFile;
    private MultipartFile proposalFile;
}
