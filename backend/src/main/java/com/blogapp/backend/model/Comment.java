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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;
    private String content;
    private Date commentDate;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "postId", referencedColumnName = "postId")
    private Post post;

}
