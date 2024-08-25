package itu.mbds.tpt.service;


import itu.mbds.tpt.entity.Echange;
import itu.mbds.tpt.entity.Post;
import itu.mbds.tpt.entity.stat.EchangeCount;
import itu.mbds.tpt.repository.EchangeRepository;
import itu.mbds.tpt.util.Constante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EchangeService {

    @Autowired
    private EchangeRepository echangeRepository;

    public long getTotalEchanges() {
        return echangeRepository.count();
    }

    public long getAcceptedEchanges() {
        return echangeRepository.countByStatus(Constante.STATUS_ACCEPTE);
    }

    public long getRefusedEchanges() {
        return echangeRepository.countByStatus(Constante.STATUS_REFUSE);
    }

    public List<EchangeCount> countEchangesByMonthAndStatus(int year, String s) {
        return echangeRepository.countEchangesByMonthAndStatus(year, s);
    }

    public List<Echange> getEchangesByPostId(int postId) {
        return echangeRepository.findByPost_Id(postId);
    }

    public Optional<Echange> findEchangeById(int id){
        return echangeRepository.findById(id);
    }
}
