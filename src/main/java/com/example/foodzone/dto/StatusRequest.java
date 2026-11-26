package com.example.foodzone.dto;

import com.example.foodzone.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record StatusRequest(@NotNull OrderStatus status) {}