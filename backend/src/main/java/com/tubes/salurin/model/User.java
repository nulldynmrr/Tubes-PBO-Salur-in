package com.tubes.salurin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
public abstract class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;
    
    @Column(name = "nama lengkap", unique = true)
    @NotBlank(message = "Nama lengkap harus diisi")
    @Pattern(
    regexp = "^[A-Za-z\\s]{2,}$",
    message = "Nama lengkap hanya boleh mengandung huruf dan spasi, minimal 2 karakter"
    )
    private String nama_lengkap;

    @Column(name = "email", unique = true)
    @NotBlank(message = "Email harus diisi")
    @Email(message = "Format email tidak valid")
    private String email;

    @Column(name = "nomor telepon")
    @NotBlank(message = "nomor telepon harus diisi")
    @Pattern(
        regexp = "^\\d{10,15}$",
        message = "Nomor telepon harus terdiri dari 10-15 digit angka"
    )
    private String nomor_telepon; 

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    UserRole role;

}