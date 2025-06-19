package com.tubes.salurin.dto;

import lombok.Data;

@Data
public class DonationRequest {
    private Long campaignId;
    private String paymentMethod;
    private String paymentProvider;
    private double amount;
}
