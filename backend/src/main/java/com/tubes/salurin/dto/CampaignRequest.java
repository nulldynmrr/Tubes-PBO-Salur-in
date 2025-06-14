package com.tubes.salurin.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignRequest {
    private String campaignTitle;
    private String description;
    private double targetAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer campaignerId;
}