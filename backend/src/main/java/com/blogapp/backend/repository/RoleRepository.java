package com.blogapp.backend.repository;
import com.blogapp.backend.enums.UserRole;
import com.blogapp.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
        Role findByRoleName(UserRole roleName);


}