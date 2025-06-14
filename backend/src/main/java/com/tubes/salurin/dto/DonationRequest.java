package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRequest {
    private String username;
    private String email;
    private String phoneNumber;
    private Boolean anonymous;

    private Double amount;
    private Integer campaignId;
}