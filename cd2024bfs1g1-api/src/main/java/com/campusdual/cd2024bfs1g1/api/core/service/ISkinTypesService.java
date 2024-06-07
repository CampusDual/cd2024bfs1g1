package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ISkinTypesService {
    public EntityResult skintypeQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult skintypeInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
    public EntityResult skintypeDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
