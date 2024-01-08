package com.blogapp.backend.controller;


import com.blogapp.backend.dto.LoginDto;
import com.blogapp.backend.dto.RegisterDto;
import com.blogapp.backend.dto.UserDto;
import com.blogapp.backend.enums.UserRole;
import com.blogapp.backend.model.Role;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.RoleRepository;
import com.blogapp.backend.repository.UserRepository;
import com.blogapp.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserService userService;
    private RoleRepository roleRepository;

    public AuthController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) throws ExecutionException, InterruptedException {
        Optional<User> existingUser = userService.getUserByUsername(registerDto.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.ok("Username is already taken");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setLname(registerDto.getLname());
        user.setFname(registerDto.getFname());
        user.setPassword(registerDto.getPassword());

        Role roleEntity = roleRepository.findByRoleName(UserRole.USER);

        if (roleEntity == null) {
            // Handle the case where the role is not found, you can log an error or throw an exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding USER role");
        }

        user.setRoles(Set.of(roleEntity));

        userService.save(user);

        return ResponseEntity.ok("Successfully registered");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        Optional<User> existingUser = userService.getUserByUsername(loginDto.getUsername());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (loginDto.getPassword().equals(existingUser.get().getPassword())){
            return ResponseEntity.ok("Successfully login");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is not correct");
        }
    }

}
