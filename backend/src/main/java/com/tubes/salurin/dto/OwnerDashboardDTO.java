package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OwnerDashboardDTO {
    private Long id;
    private String name;
    private String email;
}
