package com.leastcount.common;


//import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {

	//private static final Logger LOGGER = Logger.getLogger(HibernateUtil.class);
	private static final SessionFactory SESSIONFACTORY;
	static {
		try {
			SESSIONFACTORY = buildSessionFactory();
		} catch (Exception ex) {
			//LOGGER.error("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	private HibernateUtil() {

	}

	public static SessionFactory getSessionFactory() {
		return SESSIONFACTORY;
	}

	private static SessionFactory buildSessionFactory() {
		try {
			//LOGGER.debug("HibernateUtil.buildSessionFactory() entered ");
			Configuration cfg = new Configuration();
			cfg.configure("hibernate.cfg.xml");
			ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
					.applySettings(cfg.getProperties()).build();
			return cfg.buildSessionFactory(serviceRegistry);
		} catch (Exception ex) {
			//LOGGER.error("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}
}
