package com.example.lab10.controller;

import com.example.lab10.entity.Practicante;
import com.example.lab10.repository.PracticanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practicantes")
@CrossOrigin(origins = "*")
public class PracticanteController {

    @Autowired
    private PracticanteRepository practicanteRepository;

    @GetMapping
    public List<Practicante> listarTodos() {
        return practicanteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Practicante> obtenerPorId(@PathVariable Integer id) {
        return practicanteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Practicante crear(@RequestBody Practicante practicante) {
        return practicanteRepository.save(practicante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Practicante> actualizar(@PathVariable Integer id, @RequestBody Practicante practicante) {
        return practicanteRepository.findById(id)
                .map(p -> {
                    p.setNombreCompleto(practicante.getNombreCompleto());
                    p.setCarrera(practicante.getCarrera());
                    p.setUniversidad(practicante.getUniversidad());
                    p.setEmail(practicante.getEmail());
                    p.setPais(practicante.getPais());
                    p.setEstado(practicante.getEstado());
                    return ResponseEntity.ok(practicanteRepository.save(p));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return practicanteRepository.findById(id)
                .map(p -> {
                    practicanteRepository.delete(p);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
