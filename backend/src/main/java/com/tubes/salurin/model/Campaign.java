package com.tubes.salurin.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.tubes.salurin.interfaces.Donateable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Campaign implements Donateable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "campaigner_id")
    private Campaigner campaigner;

    @Column(name = "campaign_title", unique = true)
    @NotBlank(message = "Judul campaign harus diisi")
    @Size(min = 5, max = 100, message = "Judul campaign harus 5-100 karakter")
    private String campaignTitle;
    
    @NotBlank(message = "Deskripsi harus diisi")
    @Size(min = 20, max = 4096, message = "Deskripsi minimal 20 karakter")
    @Column(name = "description", nullable = false)
    private String description;

    @Positive(message = "Target donasi harus lebih dari 0")
    @Column(name = "target", nullable = false)
    private double targetAmount;

    @PositiveOrZero(message = "Jumlah terkumpul tidak boleh negatif")
    @Column(name = "accumulated", nullable = false)
    private double accumulatedAmount = 0.0;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Donation> donations = new ArrayList<>();

    @NotNull(message = "Tanggal mulai harus diisi")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull(message = "Tanggal selesai harus diisi")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "open", nullable = false)
    private Boolean open = false;
    
    @Override
    public void donate(Donation donation){
        if(!open){
            throw new IllegalStateException("Campaign sudah selesai");
        }

        this.accumulatedAmount += donation.getAmount();
        if(this.accumulatedAmount >= this.targetAmount){
            this.open = false;
        }
    }
}