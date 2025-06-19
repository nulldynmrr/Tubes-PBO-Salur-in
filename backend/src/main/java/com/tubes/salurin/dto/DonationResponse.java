package com.tubes.salurin.dto;

import lombok.Data;

@Data
public class DonationResponse {
    private Long id;
    private double amount;
    private String donorName;
    private Long campaignId;
    private String paymentMethod;
    private String paymentProvider;
}
