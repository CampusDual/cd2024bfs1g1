package com.campusdual.cd2024bfs1g1.model.core.service;

import com.campusdual.cd2024bfs1g1.api.core.service.IOrderService;
import com.campusdual.cd2024bfs1g1.model.core.dao.OrderDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.ProductDao;
import com.campusdual.cd2024bfs1g1.model.core.dao.UserDao;
import com.campusdual.cd2024bfs1g1.model.core.utils.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("OrderService")
@Lazy
public class OrderService implements IOrderService {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private ProductService productService;


    @Override
    public EntityResult orderByUserQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> orderMap = new HashMap<>(keyMap);
        orderMap.put(OrderDao.ATTR_ORD_CLIENT_ID, userId);
        return this.daoHelper.query(this.orderDao, orderMap, attrList);
    }

    @Override
    public EntityResult orderInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException, JsonProcessingException {
        int userId = Utils.getUserId();
        Map<String, Object> proIdFilter = new HashMap<String, Object>();
        proIdFilter.put(ProductDao.PRO_ID, attrMap.get(OrderDao.ATTR_PRO_ID));
        List<String> attrList = List.of(ProductDao.PRO_PRICE, ProductDao.PRO_SALE);
        EntityResult productER = productService.productQuery(proIdFilter, attrList);
        BigDecimal sale = (BigDecimal) ((List) productER.get(ProductDao.PRO_SALE)).get(0);
        BigDecimal price = (BigDecimal) ((List) productER.get(ProductDao.PRO_PRICE)).get(0);

        if (sale != null) {
            attrMap.put(OrderDao.ATTR_ORD_PRICE, sale);
        } else {
            attrMap.put(OrderDao.ATTR_ORD_PRICE, price);
        }
        attrMap.put(OrderDao.ATTR_ORD_CLIENT_ID, userId);
        return this.daoHelper.insert(this.orderDao, attrMap);
    }

    @Override
    public EntityResult orderUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.orderDao, attrMap, keyMap);
    }

    @Override
    public EntityResult orderDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.orderDao, keyMap);
    }

    @Override
    public EntityResult orderBySellerQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException, JsonProcessingException {

        int userId = Utils.getUserId();
        Map<String, Object> filter = new HashMap<>(keysValues);
        filter.put(ProductDao.PRO_SELLER_ID, userId);
        EntityResult er = this.daoHelper.query(this.orderDao, filter, attributes);
        return er;
    }


}
