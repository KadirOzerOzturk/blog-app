package com.blogapp.backend.controller;

import com.blogapp.backend.dto.CommentDto;
import com.blogapp.backend.dto.PostDto;
import com.blogapp.backend.model.Comment;
import com.blogapp.backend.model.Post;
import com.blogapp.backend.model.User;
import com.blogapp.backend.service.CommentService;
import com.blogapp.backend.service.PostService;
import com.blogapp.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService commentService;
    private PostService postService;
    private UserService userService;

    public CommentController(CommentService commentService, PostService postService, UserService userService) {
        this.commentService = commentService;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("/allComments/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
            List<Comment> comments = commentService.getCommentsByPostId(postId);
            return ResponseEntity.ok(comments);
        }
    @PostMapping("/saveComment")
    public ResponseEntity<String> createComment(@RequestBody CommentDto commentDto) {
        commentService.saveComment(commentDto);
        return ResponseEntity.ok("Comment saved successfully");
    }
    @DeleteMapping("/delete/{commentId}")
    public void delete(@PathVariable Long commentId) {
        Optional<Comment> comment=commentService.getCommentById(commentId);
        Comment  deletedPost=comment.get();
        commentService.delete(deletedPost);
    }
    @PutMapping("/update/{commentId}")
    public ResponseEntity<String> updateComment(@RequestBody CommentDto commentDto) {
        Optional<Comment> updatingComment=commentService.getCommentById(commentDto.getCommentId());
        Optional<Post> post=postService.getPostById(commentDto.getPostId());
        Optional<User> user=userService.getUserByUsername(commentDto.getUsername());
        if(updatingComment.isPresent()){
            Comment comment=new Comment();
            comment.setCommentDate(new Date());
            comment.setCommentId(commentDto.getCommentId());
            comment.setContent(commentDto.getContent());
            comment.setPost(post.get());
            comment.setUser(user.get());
            commentService.updateComment(comment);
            return ResponseEntity.ok("Successfully updated");
        }else {
            return ResponseEntity.ok("Comment saved successfully");

        }



    }
}
