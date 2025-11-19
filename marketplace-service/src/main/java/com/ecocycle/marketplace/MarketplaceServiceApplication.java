package com.ecocycle.marketplace;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
    scanBasePackages = {"com.ecocycle.marketplace", "com.ecocycle.common.security"})
@OpenAPIDefinition(
    info =
        @Info(
            title = "EcoCycle Marketplace Service",
            version = "1.0",
            description = "APIs for managing listings in EcoCycle"))
public class MarketplaceServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(MarketplaceServiceApplication.class, args);
  }
}
