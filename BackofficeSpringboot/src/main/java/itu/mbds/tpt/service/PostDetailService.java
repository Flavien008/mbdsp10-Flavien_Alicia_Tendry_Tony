package itu.mbds.tpt.service;

import itu.mbds.tpt.dto.PostDetailDto;
import itu.mbds.tpt.entity.Image;
import itu.mbds.tpt.entity.PostDetail;
import itu.mbds.tpt.mapper.ObjetMapper;
import itu.mbds.tpt.repository.ImageRepository;
import itu.mbds.tpt.repository.PostDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostDetailService {

    @Autowired
    private PostDetailRepository detailPostRepository;
    @Autowired
    private ImageRepository objetImageRepository;
    @Autowired
    private ObjetMapper objetMapper;

    public List<PostDetailDto> getPostDetailsWithImages(Long postId) {
        List<PostDetail> details = detailPostRepository.findByPost_Id(postId);

        List<PostDetailDto> detailDtos = new ArrayList<>();

        for (PostDetail detail : details) {
            PostDetailDto dto = new PostDetailDto();
            dto.setPostId(detail.getPost().getId());
            dto.setObjetId(detail.getObjet().getId());
            dto.setObjet(objetMapper.toObjectDtoSimple(detail.getObjet()));


            Optional<Image> imageOpt = objetImageRepository.findByItemId(detail.getObjet().getId());
            imageOpt.ifPresent(objetImage -> {
                String imageBase64 = objetImage.getImg();
                if (!imageBase64.startsWith("data:image")) {
                    imageBase64 = "data:image/png;base64," + imageBase64;
                }
                dto.setImage(imageBase64);
            });

            detailDtos.add(dto);
        }

        return detailDtos;
    }
}
