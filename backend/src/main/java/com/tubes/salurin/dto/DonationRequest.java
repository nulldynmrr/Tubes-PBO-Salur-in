package com.tubes.salurin.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class DonationRequest {
    @NotNull(message = "Amount cannot be empty")
    @Positive(message = "Amount must be positive")
    private Double amount;

    private boolean isAnonymous;
}