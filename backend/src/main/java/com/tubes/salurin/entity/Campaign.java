package com.tubes.salurin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private double targetAmount;
    private String imagePath;
    private String proposalPdfPath;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private String status;
    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private CampaignOwner owner;
}