package com.example.foodzone.controller;

import com.example.foodzone.dto.StatusRequest;
import com.example.foodzone.entity.Order;
import com.example.foodzone.entity.OrderStatus;
import com.example.foodzone.repository.OrderRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrderRepository orderRepository;

    public AdminController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/orders")
    public List<Order> allOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @PatchMapping("/orders/{id}/status")
    public Order updateStatus(@PathVariable Long id, @Valid @RequestBody StatusRequest req) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        OrderStatus from = order.getStatus();
        OrderStatus to = req.status();
        boolean ok = (from == OrderStatus.PLACED && (to == OrderStatus.PREPARING || to == OrderStatus.CANCELLED))
                || (from == OrderStatus.PREPARING && (to == OrderStatus.DELIVERED || to == OrderStatus.CANCELLED));
        if (!ok) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot change " + from + " to " + to);
        }
        order.setStatus(to);
        return orderRepository.save(order);
    }
}