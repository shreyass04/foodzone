package com.example.foodzone.controller;

import com.example.foodzone.entity.MenuItem;
import com.example.foodzone.repository.MenuItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuItemController {

    private final MenuItemRepository menuItemRepository;

    public MenuItemController(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @GetMapping
    public List<MenuItem> getAll() {
        return menuItemRepository.findAll();
    }

    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return menuItemRepository.save(item);
    }

    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItem item) {
        MenuItem existing = menuItemRepository.findById(id).orElseThrow();
        existing.setName(item.getName());
        existing.setDescription(item.getDescription());
        existing.setPrice(item.getPrice());
        existing.setCategory(item.getCategory());
        existing.setAvailable(item.getAvailable());
        return menuItemRepository.save(existing);
    }
}