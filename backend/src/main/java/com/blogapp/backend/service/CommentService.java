package com.blogapp.backend.service;

import com.blogapp.backend.dto.CommentDto;
import com.blogapp.backend.dto.PostDto;
import com.blogapp.backend.model.Comment;
import com.blogapp.backend.model.Post;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.CommentRepository;
import com.blogapp.backend.repository.PostRepository;
import com.blogapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public void saveComment(CommentDto commentDto) {
        try {
            User user = userRepository.findByUsername(commentDto.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Post post = postRepository.findById(commentDto.getPostId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            Comment comment = Comment.builder()
                    .content(commentDto.getContent())
                    .commentDate(new Date())
                    .user(user)
                    .post(post)
                    .build();

            commentRepository.save(comment);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            throw new RuntimeException("Error saving comment", e);
        }
    }


    public void delete(Comment deletedPost) {
        commentRepository.delete(deletedPost);
    }

    public Optional<Comment> getCommentById(Long commentId) {
        Optional<Comment> comment =commentRepository.findById(commentId);
        return comment;
    }


    public void updateComment(Comment comment) {
        commentRepository.save(comment);
    }
}
