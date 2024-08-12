package itu.mbds.tpt.service;

import itu.mbds.tpt.entity.stat.CategoryCount;
import itu.mbds.tpt.entity.stat.EchangeCount;
import itu.mbds.tpt.repository.EchangeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private ObjetService objetService;

    @Autowired
    private PostService postService;

    @Autowired
    private EchangeRepository echangeRepository;

    public long getTotalUtilisateurs() {
        return utilisateurService.count();
    }

    public long getNouveauxUtilisateurs() {
        return utilisateurService.countNewUsers();
    }

    public long getTotalObjets() {
        return objetService.count();
    }

    public long getTotalPosts() {
        return postService.count();
    }

    public Map<String, Long> getTopCategoriesWithOthers() {
        List<CategoryCount> categoryCounts = objetService.countObjectsByCategory();

        List<CategoryCount> sortedCategories = categoryCounts.stream()
                .sorted((a, b) -> b.getCount().compareTo(a.getCount()))
                .collect(Collectors.toList());

        Map<String, Long> topCategories = new LinkedHashMap<>();
        long otherTotal = 0;

        for (int i = 0; i < sortedCategories.size(); i++) {
            if (i < 10) {
                topCategories.put(sortedCategories.get(i).getCategoryName(), sortedCategories.get(i).getCount());
            } else {
                otherTotal += sortedCategories.get(i).getCount();
            }
        }

        if (otherTotal > 0) {
            topCategories.put("Autre", otherTotal);
        }

        return topCategories;
    }

    public Map<String, Object> getEchangesByMonthAndStatus(int year, String status) {
        List<EchangeCount> result = echangeRepository.countEchangesByMonthAndStatus(year, status.isEmpty() ? null : status);


        Map<String, Integer> dataByMonth = new LinkedHashMap<>();
        for (Month month : Month.values()) {
            dataByMonth.put(month.name(), 0);
        }

        for (EchangeCount stat : result) {
            Month month = Month.of(stat.getMonth());
            dataByMonth.put(month.name(), (int) stat.getCount());
        }

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("labels", dataByMonth.keySet().toArray(new String[0]));
        data.put("data", dataByMonth.values().toArray(new Integer[0]));

        return data;
    }
}
