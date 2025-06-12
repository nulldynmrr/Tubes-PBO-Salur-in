package com.tubes.salurin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CampaignRequest {
    @NotBlank(message = "Campaign name cannot be empty")
    private String campaignName;
    
    @NotBlank(message = "Description cannot be empty")
    private String description;
    
    @NotNull(message = "Target amount cannot be empty")
    @Positive(message = "Target amount must be positive")
    private Double targetAmount;
}