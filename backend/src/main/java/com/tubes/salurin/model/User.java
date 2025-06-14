package com.tubes.salurin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
public abstract class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "username", unique = true)
    @NotBlank(message = "Username harus diisi")
    @Pattern(
    regexp = "^[A-Za-z\\s]{2,}$",
    message = "Username hanya boleh mengandung huruf dan spasi, minimal 2 karakter"
    )
    private String username;

    @Column(name = "email", unique = true)
    @NotBlank(message = "Email harus diisi")
    @Email(message = "Format email tidak valid")
    private String email;

    @Column(name = "password")
    @NotBlank(message = "Password harus diisi")
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
        message = "Password harus terdiri dari minimal 8 karakter dan mencakup huruf, angka, serta simbol"
    )
    private String password; 

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    UserRole role;
}