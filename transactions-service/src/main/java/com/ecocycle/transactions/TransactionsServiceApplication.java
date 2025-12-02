package com.ecocycle.transactions;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Spring Boot application main class. */
@SpringBootApplication(
    scanBasePackages = {"com.ecocycle.transactions", "com.ecocycle.common.security"})
@OpenAPIDefinition(
    info =
        @Info(
            title = "EcoCycle Transactions Service",
            version = "1.0",
            description = "APIs for managing transactions in EcoCycle"))
public class TransactionsServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(TransactionsServiceApplication.class, args);
  }
}
