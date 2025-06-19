package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CampaignDTO {
    private Long id;
    private String title;
    private String description;
    private double targetAmount;
    private double accumulated;
    private String status;
    private String endDate;
}

