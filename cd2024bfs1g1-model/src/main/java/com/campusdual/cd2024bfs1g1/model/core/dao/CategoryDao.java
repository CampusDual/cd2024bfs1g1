package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="CategoryDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/CategoryDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties"
)
public class CategoryDao extends OntimizeJdbcDaoSupport {

    public static final String ATTR_CAT_ID = "CAT_ID";
    public static final String ATTR_CAT_NAME = "CAT_NAME";
}
