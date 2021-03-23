package repository;

import model.Appliance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplianceRepository extends MongoRepository<Appliance, Integer> {
}
