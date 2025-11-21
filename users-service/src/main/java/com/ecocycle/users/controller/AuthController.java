package com.ecocycle.users.controller;

import com.ecocycle.common.security.JwtUtil;
import com.ecocycle.users.model.User;
import com.ecocycle.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repo;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username,
                                           @RequestParam String email) {
        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        repo.save(u);

        String token = new JwtUtil(secret, expiration).generateToken(u.getId());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam(required = false) String email,
                                   @RequestParam(required = false) String userId) {
        try {
            User u;
            if (userId != null && !userId.isEmpty()) {
                // Login by userId (ID)
                try {
                    Long id = Long.parseLong(userId);
                    u = repo.findById(id)
                            .orElse(null);
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body("Invalid userId format");
                }
            } else if (email != null && !email.isEmpty()) {
                // Login by email
                u = repo.findAll().stream()
                        .filter(x -> x.getEmail().equals(email))
                        .findFirst()
                        .orElse(null);
            } else {
                return ResponseEntity.badRequest().body("Either email or userId must be provided");
            }
            
            if (u == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            
            String token = new JwtUtil(secret, expiration).generateToken(u.getId());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }
}
