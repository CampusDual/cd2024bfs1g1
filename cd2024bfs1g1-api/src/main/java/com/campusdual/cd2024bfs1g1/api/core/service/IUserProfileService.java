package com.campusdual.cd2024bfs1g1.api.core.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IUserProfileService {
    public EntityResult userProfileQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException;
    public EntityResult userProfileSkinQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException;
    public EntityResult userProfileInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;
    public EntityResult userProfileUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;

}
