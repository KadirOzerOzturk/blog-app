package com.blogapp.backend.controller;

import com.blogapp.backend.exception.CustomNotFoundException;
import com.blogapp.backend.model.Follow;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.UserRepository;
import com.blogapp.backend.service.FollowService;
import com.blogapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/followers")
public class FollowController {


    private FollowService followService;
    private UserService userService;


    @Autowired
    public FollowController(FollowService followService, UserService userService, UserRepository userRepository) {
        this.followService = followService;
        this.userService = userService;
    }



    @GetMapping("/{username}")
    public ResponseEntity<List<User>> getFollowers(@PathVariable String username) {
        List<User> followers = followService.getFollowers(username);
        return ResponseEntity.ok(followers);
    }
    @PostMapping("/{followerUsername}/follow/{followedUsername}")
    public ResponseEntity<?> followUser(
            @PathVariable String followerUsername,
            @PathVariable String followedUsername) {
        try {
            userService.followUser(followerUsername, followedUsername);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error following user");
        }
    }
    @DeleteMapping("/{followerUsername}/unfollow/{followedUsername}")
    public void delete(@PathVariable String followerUsername,@PathVariable String followedUsername) {
        Optional<User> follower = userService.getUserByUsername(followerUsername);
        Optional<User> followed = userService.getUserByUsername(followedUsername);


        if (follower.isPresent() && followed.isPresent()) {
            User  followerUser=follower.get();
            User  followedUser=followed.get();
            Follow follow = new Follow(followerUser, followedUser);
            followService.delete(follow);
        } else {
            throw new CustomNotFoundException("Follower or followed user not found");
        }
    }
}