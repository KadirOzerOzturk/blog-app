package com.blogapp.backend.dto;

import lombok.Data;

import java.util.Date;
@Data
public class CommentDto{

    private Long commentId;
    private String content;
    private Date commentDate;
    private String username; // Bu alan User sınıfının username alanını temsil eder
    private Long postId; // Bu alan Post sınıfının postId alanını temsil eder

    // Getter ve setter metotları ekleyebilirsiniz

}

