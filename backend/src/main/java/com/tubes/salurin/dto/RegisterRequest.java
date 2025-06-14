package com.tubes.salurin.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Email cannot be empty") 
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Contact Number cannot be empty") 
    @Size(min = 10, max = 13, message = "Contact number must be between 10 and 13 digits")
    private String contactNumber;

    @NotBlank(message = "Address cannot be empty")
    private String address;

    @NotNull(message = "Campaigner Type is required")
    private String campaignerType;
}