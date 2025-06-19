package com.tubes.salurin.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private CampaignOwner owner;
    private boolean approved;
    private String status;
    private String title;
    private String description;
    private String category;
    private String address;
    private double targetAmount;
    private double accumulated = 0.0;
    private String imagePath;
    private String proposalPdfPath;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Donation> donations;
}
