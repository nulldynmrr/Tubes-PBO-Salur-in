package com.tubes.salurin.controller;

import com.tubes.salurin.model.User; 
import com.tubes.salurin.service.AdminService; 
import com.tubes.salurin.repository.UserRepository; 

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin") 
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") 
public class AdminController {

    private final AdminService adminService; 
    private final UserRepository userRepository; 

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
            adminService.removeUser(user);
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}