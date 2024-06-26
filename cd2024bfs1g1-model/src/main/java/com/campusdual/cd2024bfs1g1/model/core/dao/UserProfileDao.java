package com.campusdual.cd2024bfs1g1.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "UserProfileDao")
@ConfigurationFile(
        configurationFile = "dao/UserProfileDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class UserProfileDao extends OntimizeJdbcDaoSupport {
    public static final String UPR_ID = "UPR_ID";
    public static final String UPR_BIRTHDATE = "UPR_BIRTHDATE";
    public static final String UPR_ADDRESS = "UPR_ADDRESS";
    public static final String USR_ID = "USR_ID";
    public static final String UGE_ID = "UGE_ID";
    public static final String SKIN_ID = "SKIN_ID";
    public static final String QUERY_USER_PROFILE_SKIN = "SKIN_COUNT";
    public static final String UPR_ZIPCODE = "UPR_ZIPCODE";
    public static final String UPR_RECIPIENT = "UPR_RECIPIENT";


}
