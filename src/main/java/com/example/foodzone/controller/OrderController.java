package com.example.foodzone.controller;

import com.example.foodzone.dto.PlaceOrderRequest;
import com.example.foodzone.entity.MenuItem;
import com.example.foodzone.entity.Order;
import com.example.foodzone.entity.OrderItem;
import com.example.foodzone.repository.MenuItemRepository;
import com.example.foodzone.repository.OrderRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {


    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;

    public OrderController(OrderRepository orderRepository, MenuItemRepository menuItemRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @PostMapping
    public Order placeOrder(@AuthenticationPrincipal Long userId,
                            @Valid @RequestBody PlaceOrderRequest request) {
        Order order = new Order();
        order.setUserId(userId);
        double total = 0;

        for (PlaceOrderRequest.Item i : request.items()) {
            MenuItem menuItem = menuItemRepository.findById(i.menuItemId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Menu item not found: " + i.menuItemId()));

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setMenuItem(menuItem);
            oi.setQuantity(i.quantity());
            oi.setPrice(menuItem.getPrice());
            order.getItems().add(oi);

            total += menuItem.getPrice() * i.quantity();
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> history(@AuthenticationPrincipal Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}