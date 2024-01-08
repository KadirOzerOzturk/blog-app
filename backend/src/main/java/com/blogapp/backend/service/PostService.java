package com.blogapp.backend.service;

import com.blogapp.backend.dto.PostDto;
import com.blogapp.backend.model.Post;
import com.blogapp.backend.model.User;
import com.blogapp.backend.repository.CommentRepository;
import com.blogapp.backend.repository.PostRepository;
import com.blogapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private PostRepository   postRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }





    public void save(PostDto postDto) {
        try {
            User user = userRepository.findByUsername(postDto.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Ensure that the user entity is in the managed state
            user = userRepository.save(user);

            Post post = Post.builder()
                    .user(user)
                    .title(postDto.getTitle())
                    .content(postDto.getContent())
                    .sharingDate(new Date())
                    .commentCount(0L)
                    .build();

            postRepository.save(post);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            throw new RuntimeException("Error saving post", e);
        }
    }


    public List<Post> getPostsByUsername(String username) {
        return postRepository.findAllByUserUsername(username);
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long postId) {
        Optional<Post> post = postRepository.findById(postId);

        return post;
    }
    public Long getCommentCountForPost(Long postId) {
        return postRepository.getCommentCountForPost(postId);
    }
    public void delete(Post post) {
        postRepository.delete(post);
    }
}
