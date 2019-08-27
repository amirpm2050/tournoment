package com.amir.tournoment.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.amir.tournoment.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.amir.tournoment.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.amir.tournoment.domain.User.class.getName());
            createCache(cm, com.amir.tournoment.domain.Authority.class.getName());
            createCache(cm, com.amir.tournoment.domain.User.class.getName() + ".authorities");
            createCache(cm, com.amir.tournoment.domain.PersistentToken.class.getName());
            createCache(cm, com.amir.tournoment.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, com.amir.tournoment.domain.TeamEntity.class.getName());
            createCache(cm, com.amir.tournoment.domain.TeamEntity.class.getName() + ".members");
            createCache(cm, com.amir.tournoment.domain.PlayerEntity.class.getName());
            createCache(cm, com.amir.tournoment.domain.GroupEntity.class.getName());
            createCache(cm, com.amir.tournoment.domain.GroupEntity.class.getName() + ".teams");
            createCache(cm, com.amir.tournoment.domain.GroupEntity.class.getName() + ".matches");
            createCache(cm, com.amir.tournoment.domain.MatchEntity.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
