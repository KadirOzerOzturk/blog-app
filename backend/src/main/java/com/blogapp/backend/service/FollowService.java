package com.blogapp.backend.service;

import com.blogapp.backend.model.Follow;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    public List<User> getFollowers(String username) {
        List<Follow> follows = followRepository.findByFollowed_Username(username);
        return follows.stream()
                .map(Follow::getFollower)
                .collect(Collectors.toList());
    }

    public void delete(Follow follow) {
        followRepository.delete(follow);
    }
}