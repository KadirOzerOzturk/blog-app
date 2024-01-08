package com.blogapp.backend.controller;

import com.blogapp.backend.dto.RegisterDto;
import com.blogapp.backend.dto.UserDto;
import com.blogapp.backend.enums.UserRole;
import com.blogapp.backend.model.Role;
import com.blogapp.backend.model.User;
import com.blogapp.backend.service.PostService;
import com.blogapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping()
public class UserController {


    private UserService userService;
    private PostService postService;

    @Autowired
    public UserController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }


    @GetMapping("/profile/{username}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String username) throws ExecutionException, InterruptedException {
        System.out.println(username);


        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
    @PutMapping("/update/{username}")
    public ResponseEntity<String> updateUser(@RequestBody UserDto userDto, @PathVariable String username) {
        Optional<User> existingUser = userService.getUserByUsername(username);

        if (existingUser.isPresent()) {
            User user = new User();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setLname(userDto.getLname());
            user.setFname(userDto.getFname());
            user.setPassword(existingUser.get().getPassword());
            user.setAbout(userDto.getAbout());

            userService.updateUserDetails(user);

            return ResponseEntity.ok("Successfully updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/roles/{username}")
    public ResponseEntity<Set<Role>> getUserRoles(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);

        if (user.isPresent()) {
            Set<Role> roles = user.get().getRoles();
            System.out.println(roles);
            return ResponseEntity.ok(roles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
