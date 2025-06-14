package com.tubes.salurin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationResponse {
    private String message;
    private String donaterName;
    private Double amount;
    private String transactionId;
    private Integer donaterId;
}
