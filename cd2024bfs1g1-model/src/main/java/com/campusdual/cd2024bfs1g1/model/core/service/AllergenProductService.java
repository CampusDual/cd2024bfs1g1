package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IAllergenProductService;
import com.campusdual.cd2024bfs1g1.model.core.dao.AllergenProductDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("AllergenProductService")
public class AllergenProductService implements IAllergenProductService {

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Autowired
    private AllergenProductDao allergenProductDao;

    @Override
    public EntityResult allergenProductQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.allergenProductDao, keysValues, attributes, "overView");
    }

    @Override
    public EntityResult allergenProductInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException {
        try {
            return this.daoHelper.insert(this.allergenProductDao, attributes);

        } catch (DuplicateKeyException e) {
            EntityResult result = new EntityResultMapImpl();
            result.setCode(EntityResult.OPERATION_WRONG);
            result.setMessage("ALLERGEN_IS_DUPLICATED");
            return result;
        }
    }
    @Override
    public EntityResult allergenProductDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.allergenProductDao, keyMap);
    }

    @Override
    public EntityResult getProductRecommendationsQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.allergenProductDao, keysValues, attributes, "userRecommendationsForProduct");
    }
}
