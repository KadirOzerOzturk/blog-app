package com.blogapp.backend.controller;

import com.blogapp.backend.dto.PostDto;
import com.blogapp.backend.exception.CustomNotFoundException;
import com.blogapp.backend.model.Follow;
import com.blogapp.backend.model.Post;
import com.blogapp.backend.model.User;
import com.blogapp.backend.service.PostService;
import com.blogapp.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RequestMapping("/posts")
@RestController
public class PostController {

    private PostService postService;
    private UserService userService;
    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/sharePost")
    public ResponseEntity<String> sharePost(@RequestBody PostDto postDto) {
        try {
            postService.save(postDto);
            return ResponseEntity.ok("Post shared successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sharing post");
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    @GetMapping("/getpostbyid/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Optional<Post> searchingPost = postService.getPostById(postId);
        if (searchingPost.isPresent()){
            Post post  =searchingPost.get();
            return ResponseEntity.ok(post);
        }else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Post>> getPosts(@PathVariable String username) throws ExecutionException, InterruptedException, ParseException {
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Post> posts = postService.getPostsByUsername(user.getUsername());
            Collections.reverse(posts);
            return ResponseEntity.ok(posts);
        } else {
            // Handle the case when the user is not present
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/{postId}/comment-count")
    public Long getCommentCountForPost(@PathVariable Long postId) {
        return postService.getCommentCountForPost(postId);
    }

    @DeleteMapping("/delete/{postId}")
    public void delete(@PathVariable Long postId) {
        Optional<Post> post=postService.getPostById(postId);
        Post  deletedPost=post.get();
        postService.delete(deletedPost);
    }
}
