UPDATE public.usr_role
	SET rol_json_client_permission='{ "menu": [{ "attr": "admin", "visible": false, "enabled": false },{"attr": "products", "visible": false, "enabled": false}, {"attr": "orders", "visible": false, "enabled": false}, {"attr": "categories", "visible": false, "enabled": false}]}'
	WHERE rol_id=2;