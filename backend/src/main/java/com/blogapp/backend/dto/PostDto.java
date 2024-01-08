package com.blogapp.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PostDto {

    private Long postId;
    private String username; // Add username field
    private String title;
    private String content;
    private Date sharingDate;
    private Long commentCount;

}