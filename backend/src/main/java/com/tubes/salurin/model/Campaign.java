package com.tubes.salurin.model;

import java.util.ArrayList;
import java.util.List;

import com.tubes.salurin.model.enums.CampaignStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "campaigns")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "campaigner_id")
    private Campaigner campaigner;
    @Column(name = "campaign_name")
    private String campaignName;
    @Lob
    private String description;
    @Column(name = "target")
    private double targetAmount;
    @Column(name = "accumulated")
    private double accumulatedAmount;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CampaignStatus status; 

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Donation> donations = new ArrayList<>();

    public void addDonation(Donation donation) {
        this.donations.add(donation);
        donation.setCampaign(this);
        this.accumulatedAmount += donation.getAmount();
    }
}