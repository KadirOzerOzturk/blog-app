package com.blogapp.backend.repository;

import com.blogapp.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Query("SELECT c FROM Comment c WHERE c.post.postId = :postId")
    List<Comment> findByPostId(@Param("postId") Long postId);
    @Query("SELECT c FROM Comment c WHERE c.commentId = :commentId")
    Optional<Comment> findById(@Param("commentId") Long commentId);
}
