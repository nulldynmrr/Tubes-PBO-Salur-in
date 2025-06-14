package com.tubes.salurin.dto;

import com.tubes.salurin.model.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Username harus diisi")
    @Pattern(
        regexp = "^[A-Za-z\\s]{2,}$",
        message = "Username hanya boleh mengandung huruf dan spasi, minimal 2 karakter"
    )
    private String username;

    @NotBlank(message = "Email harus diisi")
    @Email(message = "Format email tidak valid")
    private String email;

    @NotBlank(message = "Password harus diisi")
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
        message = "Password harus terdiri dari minimal 8 karakter dan mencakup huruf, angka, serta simbol"
    )
    private String password;

    @NotNull(message = "Role harus diisi")
    private UserRole role;

    private Boolean anonymous;

    @Pattern(regexp = "^\\d{10,15}$", message = "Nomor kontak harus terdiri dari 10-15 digit angka")
    private String contactNumber;

    @NotBlank(message = "Alamat harus diisi")
    private String address;

    @NotBlank(message = "Kategori harus diisi")
    private String category;
}