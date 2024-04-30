package com.campusdual.cd2024bfs1g1.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IProductService {

    public EntityResult productQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;
    public EntityResult productInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;


}
