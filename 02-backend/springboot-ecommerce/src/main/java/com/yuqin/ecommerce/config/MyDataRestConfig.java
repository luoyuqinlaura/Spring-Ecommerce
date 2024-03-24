package com.yuqin.ecommerce.config;

import com.yuqin.ecommerce.Entity.Product;
import com.yuqin.ecommerce.Entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

//        disable HTTP requests for Producy: PUT, POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // disable HTTP requests for Producy: PUT, POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // call internal helper method to help us expose product category id
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //get all entity form the entityManager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create an array for entity types
        List<Class> entityCLasses = new ArrayList<>();

        //get entity type for the entities
        for (EntityType tempEntityType : entities) {
            entityCLasses.add(tempEntityType.getJavaType());
        }

        // expose the ids
        Class[] domainTypes = entityCLasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
