package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.PostDto;
import itu.mbds.tpt.entity.Post;
import itu.mbds.tpt.entity.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public Post toPost(PostDto postDto){
        return Post.builder()
                .id(postDto.getId())
                .titre(postDto.getTitre())
                .latitude(postDto.getLatitude())
                .longitude(postDto.getLongitude())
                .status(postDto.getStatus())
                .utilisateur(Utilisateur.builder().id(postDto.getId()).build())
                .build();
    }

    public PostDto toPostDto(Post post){
        return PostDto.builder()
                .id(post.getId())
                .titre(post.getTitre())
                .status(post.isStatus())
                .longitude(post.getLongitude())
                .latitude(post.getLatitude())
                .utilisateurId(post.getUtilisateur().getId())
                .build();
    }
}
