package com.blogapp.backend.repository;

import com.blogapp.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.user.username = :username")
    List<Post> findAllByUserUsername(@Param("username") String username);
    @Modifying
    @Query("DELETE FROM Post p WHERE p.postId = :postId")
    void deleteById(@Param("postId") Long postId);
    @Query(nativeQuery = true, value = "SELECT get_comment_count_for_post(:postId)")
    Long getCommentCountForPost(@Param("postId") Long postId);


}

