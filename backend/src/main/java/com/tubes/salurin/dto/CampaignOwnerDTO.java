package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CampaignOwnerDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String organization;
}
