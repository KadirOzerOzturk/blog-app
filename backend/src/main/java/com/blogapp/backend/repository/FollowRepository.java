package com.blogapp.backend.repository;


import com.blogapp.backend.model.Follow;
import com.blogapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFollowerAndFollowed(User follower, User followed);
    List<Follow> findByFollowed_Username(String followedUsername);


}
