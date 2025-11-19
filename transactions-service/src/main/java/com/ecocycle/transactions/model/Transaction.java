package com.ecocycle.transactions.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import lombok.*;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long listingId;
  private Long buyerId;
  private Long sellerId;

  @Enumerated(EnumType.STRING)
  private TransactionStatus status;

  private BigDecimal agreedPrice;

  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();
}
