package itu.mbds.tpt.service;

import itu.mbds.tpt.dto.EchangeDetailDto;
import itu.mbds.tpt.entity.Image;
import itu.mbds.tpt.entity.EchangeDetail;
import itu.mbds.tpt.mapper.ObjetMapper;
import itu.mbds.tpt.repository.ImageRepository;
import itu.mbds.tpt.repository.EchangeDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class EchangeDetailService {

    @Autowired
    private EchangeDetailRepository echangeDetailRepository;
    @Autowired
    private ImageRepository objetImageRepository;
    @Autowired
    private ObjetMapper objetMapper;

    public List<EchangeDetailDto> getEchangeDetailsWithImages(Long postId) {
        List<EchangeDetail> details = echangeDetailRepository.findByEchange_Id(postId);

        List<EchangeDetailDto> detailDtos = new ArrayList<>();

        for (EchangeDetail detail : details) {
            EchangeDetailDto dto = new EchangeDetailDto();
            dto.setEchangeId(detail.getEchange().getId());
            dto.setObjetId(detail.getObjet().getId());
            dto.setObjet(objetMapper.toObjectDtoSimple(detail.getObjet()));


            Optional<Image> imageOpt = objetImageRepository.findByItemId(detail.getObjet().getId());
            imageOpt.ifPresent(objetImage -> dto.setImage(objetImage.getImg()));

            detailDtos.add(dto);
        }

        return detailDtos;
    }
}
