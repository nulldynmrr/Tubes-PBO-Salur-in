package com.tubes.salurin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private Integer status;      
    private String message; // yang keliatan di user  
    private Long timestamp;
}
