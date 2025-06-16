package com.tubes.salurin.dto;

import lombok.Data;

@Data
public class DonationResponse {
    private Long id;
    private double amount;
    private String donorName;
    private String message;
    private Long campaignId;
}
