package com.blogapp.backend.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String fname;
    private String lname;
    private String email;
    private String password;
}
