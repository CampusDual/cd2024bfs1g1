package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="UserGenderDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/UserGenderDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class UserGenderDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_UGE_ID = "UGE_ID";
    public static final String ATTR_UGE_NAME = "UGE_NAME";
}
