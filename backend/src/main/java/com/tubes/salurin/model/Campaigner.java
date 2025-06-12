package com.tubes.salurin.model;

import java.util.List;

import com.tubes.salurin.model.enums.CampaignerType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "campaigners")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)

public class Campaigner extends User {
    @Column(name = "name")
    private String name;

    @Column(name = "contact")
    private String contactNumber; 

    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private CampaignerType type;
    
    @OneToMany(mappedBy = "campaigner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campaign> campaigns; 
}