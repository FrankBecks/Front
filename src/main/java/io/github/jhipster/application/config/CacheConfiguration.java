package io.github.jhipster.application.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrder.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrder.class.getName() + ".salesOrderTests", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrder.class.getName() + ".samples", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PaymentMethod.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.OrderType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.OrderPriority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.OrderStatus.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ReportType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.TestType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sample.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sample.class.getName() + ".salesOrders", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.TestTag.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.TestTag.class.getName() + ".salesOrderTests", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Segment.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Parameter.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Parameter.class.getName() + ".parameterOptions", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Parameter.class.getName() + ".salesOrderTests", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParameterOption.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParameterOption.class.getName() + ".parameters", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.ParameterType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.MessageType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrderTest.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrderTest.class.getName() + ".testTags", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrderTest.class.getName() + ".parameters", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.SalesOrderTest.class.getName() + ".salesOrders", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Message.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
