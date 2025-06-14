package com.tubes.salurin.model;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "amount")
    private double amount;
    
    @CreationTimestamp
    @ManyToOne
    @JoinColumn(name = "donater_id")
    private Donater donater;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;
}