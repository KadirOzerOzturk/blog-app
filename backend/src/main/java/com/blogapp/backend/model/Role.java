package com.blogapp.backend.model;

import com.blogapp.backend.enums.UserRole;
import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private UserRole roleName;
}
