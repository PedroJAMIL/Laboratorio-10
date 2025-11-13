package com.example.lab10.repository;

import com.example.lab10.entity.Practicante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticanteRepository extends JpaRepository<Practicante, Integer> {
}
