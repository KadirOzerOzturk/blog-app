package com.blogapp.backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DbConnection {
    @Query("SELECT ur.username, r.roleId, r.roleName FROM user_roles ur JOIN roles r ON r.roleId = ur.roleId WHERE ur.username = :username")
    List<Object[]> getUserRolesByUsername(@Param("username") String username);

    @Query("SELECT u.username, u.about, u.email, u.fname, u.lname, u.password, r.username, r.roleId, r.roleName FROM User u " +
            "LEFT JOIN user_roles ur ON u.username = ur.username " +
            "LEFT JOIN roles r ON r.roleId = ur.roleId " +
            "WHERE u.username = :username")
    List<Object[]> getUserWithRolesByUsername(@Param("username") String username);

    @Query("SELECT f.followed, f.follower FROM Follow f " +
            "LEFT JOIN User u ON u.username = f.followed " +
            "WHERE u.username = :username")
    List<Object[]> getFollowersByUsername(@Param("username") String username);
    @Query("SELECT p.postId, p.commentCount, p.content, p.sharingDate, p.title, " +
            "u.username, u.about, u.email, u.fname, u.lname, u.password, " +
            "r.username, r.roleId, r.roleName " +
            "FROM Post p " +
            "LEFT JOIN User u ON u.username = p.user.username " +
            "LEFT JOIN user_roles ur ON u.username = ur.username " +
            "LEFT JOIN roles r ON r.roleId = ur.roleId " +
            "WHERE p.postId = :postId")
    List<Object[]> getPostAndUserDetailsByPostId(@Param("postId") Long postId);



}
