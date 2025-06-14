package com.tubes.salurin.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "campaigners")
@Getter
@Setter
@NoArgsConstructor
public class Campaigner extends User {
    @Column(name = "contact")
    @NotBlank(message = "Nomor kontak harus diisi")
    @Pattern(regexp = "^\\d{10,15}$", message = "Nomor kontak harus terdiri dari 10-15 digit angka")
    private String contactNumber; 

    @Column(name = "address")
    @NotBlank(message = "Alamat harus diisi")
    private String address;

    @Column(name = "category")
    @NotBlank(message = "Kategori harus diisi")
    private String category;

    @OneToMany(mappedBy = "campaigner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campaign> campaigns; 
}