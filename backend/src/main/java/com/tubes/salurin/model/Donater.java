package com.tubes.salurin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "donaters")
@Getter
@Setter
@NoArgsConstructor
public class Donater extends User{
    @Column(name = "contact")
    @NotBlank(message = "Nomor kontak harus diisi")
    @Pattern(regexp = "\\d{10,15}", message = "Nomor kontak harus 10–15 digit angka")
    private String contactNumber;

    @Column(name = "anonymous")
    private Boolean anonymous;
}

