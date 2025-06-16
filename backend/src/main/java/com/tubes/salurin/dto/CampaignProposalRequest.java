package com.tubes.salurin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CampaignProposalRequest {
    private String title;
    private String description;
    private double targetAmount;
    private String imagePath;
    private String proposalPdfPath;
    private LocalDate dateStart;
    private LocalDate dateEnd;
}
