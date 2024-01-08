package com.blogapp.backend.dto;

import com.blogapp.backend.model.Role;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String fname;
    private String lname;
    private String email;
    private String password;
    private Set<Role> roles;
    private String about;

}
