package com.blogapp.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post_log")
public class PostLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;


    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;
    private String title;
    private String content;
    private Date sharingDate;
    private Long commentCount;
}
