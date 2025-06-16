package com.tubes.salurin.entity;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
public class CampaignOwner extends User {
    private String phone;
    private String organization;
}