package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate; 
@Data 
@Builder 
@NoArgsConstructor 
@AllArgsConstructor 
public class CampaignResponse {
    private Integer id; 
    private String campaignTitle; 
    private String description; 
    private double targetAmount; 
    private double accumulatedAmount; 
    private LocalDate startDate; 
    private LocalDate endDate; 
    private boolean open; 

    private String message; 
    public CampaignResponse(String message) {
        this.message = message;
    }
}