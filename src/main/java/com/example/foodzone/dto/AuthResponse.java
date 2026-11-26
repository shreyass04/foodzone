package com.example.foodzone.dto;

public record AuthResponse(String token, Long id, String name, String email, String role) {}