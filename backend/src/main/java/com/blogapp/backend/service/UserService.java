package com.blogapp.backend.service;

import com.blogapp.backend.dto.UserDto;
import com.blogapp.backend.model.Follow;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.FollowRepository;
import com.blogapp.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {
    private UserRepository userRepository;
    @Autowired
    private FollowRepository followRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String save(User user) {
        userRepository.save(user);
        return "success";
    }

    public void followUser(String followerUsername, String followedUsername) {
        User follower = userRepository.findByUsername(followerUsername)
                .orElseThrow(() -> new EntityNotFoundException("Follower not found"));

        User followed = userRepository.findByUsername(followedUsername)
                .orElseThrow(() -> new EntityNotFoundException("Followed user not found"));

        // Check if the follow relationship already exists
        Follow existingFollow = followRepository.findByFollowerAndFollowed(follower, followed);

        if (existingFollow == null) {
            // Assuming Follow is your entity to represent the relationship
            Follow follow = new Follow(follower, followed);

            // Save the follow relationship
            followRepository.save(follow);
        } else {
            // Handle the case where the follow relationship already exists
            // You might want to throw an exception or handle it according to your business logic.
            throw new IllegalStateException("Already following the user");
        }
    }
    @Transactional
    public void updateUserDetails(User user) {
        System.out.println(user.getPassword());
        userRepository.updateUserDetails(user.getUsername(), user.getEmail(), user.getFname(), user.getLname(), user.getAbout());
    }



}
