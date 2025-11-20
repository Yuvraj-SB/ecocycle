package com.ecocycle.common.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;

/** Security utility class for JwtUtil. */
public final class JwtUtil {

  private final SecretKey key;
  private final long expiration;

  /**
   * Constructor for JwtUtil.
   *
   * @param secret JWT secret key
   * @param expiration token expiration time in milliseconds
   */
  public JwtUtil(String secret, long expiration) {
    // Generate HMAC-SHA key from string with explicit encoding
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expiration = expiration;
  }

  /**
   * Generates a JWT token for a user.
   *
   * @param userId user ID
   * @return JWT token string
   */
  public String generateToken(Long userId) {
    return Jwts.builder()
        .subject(String.valueOf(userId))
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(key) // ✅ sign with SecretKey
        .compact();
  }

  /**
   * Validates JWT token and extracts user ID.
   *
   * @param token JWT token string
   * @return user ID
   */
  public Long validateAndExtractUserId(String token) {
    var claims =
        Jwts.parser()
            .verifyWith(key) // ✅ now key is SecretKey
            .build()
            .parseSignedClaims(token)
            .getPayload();

    return Long.valueOf(claims.getSubject());
  }
}
