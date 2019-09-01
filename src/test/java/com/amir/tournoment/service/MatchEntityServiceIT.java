package com.amir.tournoment.service;

import com.amir.tournoment.TournomentApp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(classes = TournomentApp.class)
@Transactional
public class MatchEntityServiceIT {
    @Autowired
    MatchEntityService matchEntityService ;
}
