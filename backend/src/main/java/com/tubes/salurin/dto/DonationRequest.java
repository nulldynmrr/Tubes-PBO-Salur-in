package com.tubes.salurin.dto;

import lombok.Data;

@Data
public class DonationRequest {
    private Long donorId;
    private double amount;
    private String donorName;
    private String message;
    private Long campaignId;
}
