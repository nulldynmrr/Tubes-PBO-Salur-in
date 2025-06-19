package com.tubes.salurin.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CampaignResponse {
    private Long id;
    private String title;
    private String description;
    private double targetAmount;
    private double accumulated;
    private String imagePath;
    private String proposalPdfPath;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private String kategori;
    private String alamat;
}
