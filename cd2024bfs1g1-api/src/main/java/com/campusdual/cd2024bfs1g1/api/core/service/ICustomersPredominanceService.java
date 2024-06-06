package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface ICustomersPredominanceService {

    EntityResult pruebaQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    EntityResult customerAgeAndGenderQuery(Map<String, Object> keysValues, List<String> attributes)throws OntimizeJEERuntimeException, JsonProcessingException;
}
