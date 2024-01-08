package com.blogapp.backend.repository;

import com.blogapp.backend.dto.UserDto;
import com.blogapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,User> {
    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(String username);
    @Modifying
    @Query("UPDATE User u SET u.email = :email,  u.fname = :fname,u.lname = :lname, u.about = :about WHERE u.username = :username")
    void updateUserDetails(@Param("username") String username, @Param("email") String email, @Param("lname") String lname, @Param("fname") String fname, @Param("about") String about);





}
